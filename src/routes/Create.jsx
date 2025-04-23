import { useState } from 'react'
import './Create.css'


function Create() {

  return (
    <div className="Create">
        <div className="createPostContainer">
            <h1 className="CreatePostTitle">Create Post</h1>
            <div className = "titleHolder">
                <h2>User:</h2>
                <input type="text" placeholder="Post Title" className="titleInput" />
            </div>
            <div className = "titleHolder">
                <h2>Title:</h2>
                <input type="text" placeholder="Post Title" className="titleInput" />
            </div>
            <div className = "titleHolder">
                <h2>Content:</h2>
                <input type="text" placeholder="Post Title" className="titleInput" />
            </div>
            <button className="createButtonForCreate">Post</button>
        </div>
    </div>
  )
}

export default Create