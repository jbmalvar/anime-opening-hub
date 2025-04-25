import './Post.css';
import { useState, useEffect } from 'react';
import { supabase } from '../client';


const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function Post({ id, user, postDate, title, anime, animeId, image, content, votes: initialVotes }) {
  const [showMenu, setShowMenu] = useState(false);
  const [votes, setVotes] = useState(initialVotes);
  const [animeImg, setAnimeImg] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const deletePost = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('animePosts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return;
    }

    alert('Post deleted successfully!');
    // Optionally, refresh the page or update the UI
    window.location.reload();
  };

  const editPost = () => {
    // Navigate to an edit page or handle editing logic here
    window.location.href = `/edit/${id}`;
  };

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

  useEffect(() => {
    const fetchAnimeImage = async () => {
      try {
        const response = await fetch(`${API_URL}/anime?filter[anime][id]=${animeId}&include=images`);
        const data = await response.json();
        console.log(data); // Log the response for debugging
        setAnimeImg(data.anime?.[0].images[0].link); // Set the first image link or an empty string if not found
      } catch (error) {
        console.error('Error fetching anime image:', error);
      }

      console.log(data);
    };

    if (animeId) {
      fetchAnimeImage();
    }
  }, [animeId]);

  console.log(animeImg);

  return (
    <div className="Post">
      <label className="smallText">User: {user}</label>
      <label className="smallText">Post Date: {postDate}</label>
      <h2>{title}</h2>
      <div className="postImgContainer">
        {animeImg && <img className="postAnimImg" src={animeImg} alt={`${title} cover`} />}
        <label className="smallText">{anime}</label>
      </div>
      <label className="smallText">{content}</label>
      {image && <img className="postImg" src={image} alt={`${title} cover`} />}
      <span className="votes">
        <button className="upvote" onClick={() => handleVote('upvote')}>👍</button>
        {votes}
        <button className="upvote" onClick={() => handleVote('downvote')}>👎</button>
      </span>
      <div className="menu">
        <button className="menuButton" onClick={toggleMenu}>⋮</button>
        {showMenu && (
          <div className="menuOptions">
            <button onClick={editPost}>Edit</button>
            <button onClick={deletePost}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;