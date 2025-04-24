import './Post.css';
import { useState } from 'react';
import { supabase } from '../client';

function Post({ id, user, postDate, title, anime, imageUrl, content, votes: initialVotes }) {
  const [showMenu, setShowMenu] = useState(false);
  const [votes, setVotes] = useState(initialVotes);

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

  return (
    <div className="Post">
      <label className="smallText">User: {user}</label>
      <label className="smallText">Post Date: {postDate}</label>
      <h2>{title}</h2>
      <div className="postImgContainer">
        <img className="postAnimImg" src={imageUrl} alt={`${title} cover`} />
        <label className="smallText">{anime}</label>
      </div>
      <label className="smallText">{content}</label>
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