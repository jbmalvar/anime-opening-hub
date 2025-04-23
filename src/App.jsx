import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Search from './routes/Home'
import Create from './routes/Create'
import Anime from './routes/Anime'
import About from './routes/About'


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
            <Link to="/home"><a>Home</a></Link>
            <Link to="/anime"><a>Animes</a></Link>
            <Link to="/about"><a>About</a></Link>
          </div>
        </div>
      </nav>
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
