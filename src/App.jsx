import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Search from './routes/Search'
import Create from './routes/Create'


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
            <a>About</a>
            <a>Search</a>
            <a>Animes</a>
          </div>
        </div>
      </nav>
      <div className="main">
        <Create></Create>
      </div>
    </div>
  )
}

export default App
