import { useState } from 'react'
import './Post.css'


function Post() {

  return (
    <div className="Post">
        <span>
            <label>Post ID: </label>
            <label>Post Date: </label>
        </span>
        <h2>Title: </h2>
        <label>Anime: </label>
        <label>Score: </label>
        <img></img>
        <span className = "votes">
            <label>Upvote: </label>
            <label>Downvote: </label>
        </span>
    </div>
  )
}

export default Post