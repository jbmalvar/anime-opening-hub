import './PostDetails.css'


function PostDetails() {

  return (
    <div className="PostDetails">
        <label>User: </label>
        <label>Date Created: </label>
        <h2>Post Title</h2>
        <label>Comments made</label>
        <img></img>
        <h3>Comments</h3>
        <input type="text" placeholder="Add a comment" className="commentInput" />
        <button>Cancel</button>
        <button>Comment</button>
    </div>
  )
}

export default PostDetails
