import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './Home.css'
import Post from '../components/Post'


function Home() {

  return (
    <div className="Home">
        <div className ="SearchContainer">
            <div className = "titleHolder">
                <h1 className="searchTitleH1">Search For Post Here</h1>
                <Link to="/create"><button className="createPostBut">+ Create Post</button></Link>
            </div>
            <input type="text" placeholder="Search using by using Anime or Post Title" className="searchInput" />
            <span className = "sortContainer">
                <label>Sort: </label>
                <select className="sortSelect">
                    <option value="latest">Latest</option>
                </select>
            </span>
        </div>
    </div>
  )
}

export default Home