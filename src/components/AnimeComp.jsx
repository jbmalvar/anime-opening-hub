import { useState } from 'react'
import './AnimeComp.css'

function AnimeComp({ imageUrl, title}) {
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);

  return (
    <div className="AnimeComp">
        <div className="animeCompContainer">
            <div className="imageWrapper">
                <img src={imageUrl} className="animeImg"></img>
                <label className="animeTitle">{title}</label>
            </div>
        </div>
    </div>
  )
}

export default AnimeComp