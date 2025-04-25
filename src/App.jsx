import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Search from './routes/Home'
import Create from './routes/Create'
import Anime from './routes/Anime'
import About from './routes/About'
import AnimeDetails from './routes/AnimeDetails'
import PostDetails from './routes/PostDetails'


function App() {

  return (
    <div className="App">
      <nav className="topBar">
        <div className="structureFlex">
          <div className="topTitle">
            <span style={{ color: 'white' }}>AnimeOp</span>
            <span style={{ color: 'red' }}>Hub</span>
          </div>
          <div className="rightSide">
            <Link to="/home" className = "links">Home</Link>
            <Link to="/anime" className = "links">Anime</Link>
            <Link to="/about" className = "links">About</Link>
          </div>
        </div>
      </nav>
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Create />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime-details/:id" element={<AnimeDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
