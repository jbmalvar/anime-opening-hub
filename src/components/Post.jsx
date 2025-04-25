import './Post.css';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function Post({ id, user, postDate, title, anime, animeId, image, content, votes: initialVotes }) {
  const [showMenu, setShowMenu] = useState(false);
  const [votes, setVotes] = useState(initialVotes);
  const [animeImg, setAnimeImg] = useState("");
  const navigate = useNavigate();

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

  const handlePostClick = () => {
    navigate(`/post-details/${id}`); // Redirect to PostDetails page with the post ID
  };

const VoteButton = ({ type, onClick }) => (
  <button className="upvote" onClick={(e) => { e.stopPropagation(); onClick(type); }}>
    {type === 'upvote' ? '👍' : '👎'}
  </button>
);

return (
  <div className="Post" onClick={handlePostClick} style={{ cursor: 'pointer' }}>
    <label className="smallText">User: {user}</label>
    <label className="smallText">Post Date: {postDate}</label>
    <h2>{title}</h2>
    <span className="votes">
      <VoteButton type="upvote" onClick={handleVote} />
      {votes}
      <VoteButton type="downvote" onClick={handleVote} />
    </span>
    <div className="menu">
      <button className="menuButton" onClick={(e) => { e.stopPropagation(); toggleMenu(); }}>⋮</button>
      {showMenu && (
        <div className="menuOptions">
          <button onClick={(e) => { e.stopPropagation(); editPost(); }}>Edit</button>
          <button onClick={(e) => { e.stopPropagation(); deletePost(e); }}>Delete</button>
        </div>
      )}
    </div>
  </div>
);
}

export default Post;