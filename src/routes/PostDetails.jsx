import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import './PostDetails.css'

const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function PostDetails() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // Ensure post is initialized as null
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [anime, setAnime] = useState(null);
  const [votes, setVotes] = useState(0); // Initialize votes state

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('animePosts')
        .select()
        .eq('id', id)
        .single(); // Fetch a single post

      if (error) {
        console.error('Error fetching post:', error);
        return;
      }

      setPost(data);
      setVotes(data.votes || 0); // Set votes when post is loaded
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!post || !post.animeId) return; // Ensure post and animeId are defined before running
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/anime?filter[anime][id]=${post.animeId}&include=animethemes.animethemeentries.videos.audio,images`
        );
        const data = await response.json();
        const firstAnime = data.anime?.[0] || null;
        setAnime(firstAnime);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimeDetails();
  }, [post]); // Only run when post changes

  const handleVote = async (voteType) => {
    const newVotes = voteType === 'upvote' ? votes + 1 : votes - 1;
    const { error } = await supabase
      .from('animePosts')
      .update({ votes: newVotes })
      .eq('id', id);

    if (error) {
      console.error('Error updating votes:', error);
      return;
    }
    setVotes(newVotes); // Update local state to reflect the change immediately
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      // Remove the comment at the specified index
      const updatedComments = post.comment.filter((_, index) => index !== commentIndex);
  
      // Update the comments array in the database
      const { error: updateError } = await supabase
        .from('animePosts')
        .update({ comment: updatedComments })
        .eq('id', id);
  
      if (updateError) {
        throw updateError;
      }
  
      // Update the local state to reflect the changes
      setPost((prevPost) => ({
        ...prevPost,
        comment: updatedComments,
      }));
  
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      alert('An error occurred while deleting the comment. Please try again.');
    }
  };

  const handleComment = async () => {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim(); // Get the comment value
    if (!comment) return;
  
    try {
      // Fetch the current comments array
      const { data: post, error: fetchError } = await supabase
        .from('animePosts')
        .select('comment')
        .eq('id', id)
        .single();
  
      if (fetchError) {
        throw fetchError;
      }
  
      // Append the new comment to the existing array
      const updatedComments = [...(post.comment || []), comment];
  
      // Update the comments array in the database
      const { error: updateError } = await supabase
        .from('animePosts')
        .update({ comment: updatedComments })
        .eq('id', id);
  
      if (updateError) {
        throw updateError;
      }
  
      alert('Comment added successfully!');
      commentInput.value = ''; // Clear the input field
      commentInput.blur(); // Unfocus the input
    } catch (error) {
      console.error('Error inserting data:', error.message);
      alert('An error occurred while adding the comment. Please try again.');
    }
  };
  
  const VoteButton = ({ type, onClick }) => (
    <button className="upvote" onClick={(e) => { e.stopPropagation(); onClick(type); }}>
      {type === 'upvote' ? '👍' : '👎'}
    </button>
  );

  return (
    <div className="PostDetails">
      {isLoading ? (
        <p>Loading...</p>
      ) : post ? (
        <div className="PostDetailsContainer">
          <div className="postDetailsTitlePlusImage">
            <Link to="/home">
              <button className="returnBackToHome">⇦</button>
            </Link>
            {anime?.images?.[0]?.link && (
              <img className="postImg" src={anime.images[0].link} alt="Anime" />
            )}
            <div className="postDetailsTitle">
              <span className="topPartOfIntro">
                <span>{post.user} </span> • <span>{post?.created_at?.split('T')[0]}</span>
              </span>
              <span className="postAnimeTitle">{post.anime}</span>
            </div>
          </div>
          <h2 className="postTitle">{post.title}</h2>
          <p className="postContent">{post.content}</p>
          <img className="postImage" src={post.image} alt="Post" />
          <p>Opening:</p>
          <audio className="audioinPost" controls preload="auto">
            <source src={anime.animethemes?.[0]?.animethemeentries?.[0]?.videos?.[0]?.audio.link} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
          <div className="postDetailsButtons">
            <span className="votes">
              <VoteButton type="upvote" onClick={handleVote} />
              {votes}
              <VoteButton type="downvote" onClick={handleVote} />
            </span>
            <span className="commentButtonSpan">
              <button className="commentButton">💬</button>
            </span>
          </div>
          <div className="commentContainer">
            <div className="commentMake">
              <textarea id="commentInput" type="text" placeholder="Join the conversation"></textarea>
              <div className="actions">
                <button className="cancel"
                  onClick={() => {
                    document.getElementById('commentInput').value = ''; // Clear the input field
                    document.activeElement.blur(); // Unfocus the input
                  }}
                >
                  Cancel
                </button>
                <button
                  className="submit"
                  onClick={async () => {
                    await handleComment(); // Call the handleComment function
                    const commentInput = document.getElementById('commentInput');
                    commentInput.value = ''; // Clear the input field
                    commentInput.blur();
                    window.location.reload();
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
            <div className="comments">
              <h3>Comments</h3>
              {post.comment && post.comment.length > 0 ? (
                post.comment.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>{comment}</p>
                    <button
                      className="deleteComment"
                      onClick={() => handleDeleteComment(index)} // Pass the index of the comment to delete
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
}

export default PostDetails
