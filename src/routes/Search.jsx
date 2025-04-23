import { useState } from 'react'
import './Search.css'
import Post from '../components/Post'


function Search() {

  return (
    <div className="Search">
        <div className ="SearchContainer">
            <div className = "titleHolder">
                <h1 className="searchTitleH1">Search For Post Here</h1>
                <button className="createPostBut">+ Create Post</button>
            </div>
            <input type="text" placeholder="Search using by using Anime or Post Title" className="searchInput" />
            <span className = "sortContainer">
                <label>Sort: </label>
                <select className="sortSelect">
                    <option value="latest">Latest</option>
                </select>
            </span>
        </div>
        <Post></Post>
    </div>
  )
}

export default Search