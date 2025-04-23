import { useState } from 'react'
import AnimeComp from '../components/AnimeComp'
import './Anime.css'

function Anime() {

  return (
    <div className="Anime">
      <div className="AnimeContainer">
        <AnimeComp></AnimeComp>
      </div>
    </div>
  )
}

export default Anime;
