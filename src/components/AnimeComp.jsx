import { useState } from 'react'
import './AnimeComp.css'


function AnimeComp() {

  return (
    <div className="AnimeComp">
        <div className="animeCompContainer">
            <div className="imageWrapper">
                <img src="https://m.media-amazon.com/images/M/MV5BNjAxMmFjZjgtYjM1ZS00NzdmLTliZDktZmIyMzU5YTBlNDBmXkEyXkFqcGc@._V1_.jpg" className="animeImg"></img>
                <label className="animeTitle">Apothecary Diaries</label>
            </div>
        </div>
    </div>
  )
}

export default AnimeComp