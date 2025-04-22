import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'


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
            <a>Search</a>
            <a>Create</a>
            <a>Animes</a>
          </div>
        </div>
      </nav>
      <div className="main">
        <Routes>
          
        </Routes>
      </div>
    </div>
  )
}

export default App
