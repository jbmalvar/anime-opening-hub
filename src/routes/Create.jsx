import { useState } from 'react'
import { Link } from 'react-router-dom'
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
            <div className="createButtonContainerForCreate">
                <Link to="/home"><button className="createButtonForCreate"> Back </button></Link>
                <Link to="/home"><button className="createButtonForCreate"> Post </button></Link>
            </div>
        </div>
    </div>
  )
}

export default Create