import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnimeDetails.css';

const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function AnimeDetails() {
    const { id } = useParams(); // Get the anime ID from the URL
    const [anime, setAnime] = useState(null); // State to store anime details
    const [isLoading, setIsLoading] = useState(true); // Loading state


    // anime?include=animethemes,images&page[size]=28&page[number]=
    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/anime?filter[anime][id]=${id}&include=animethemes.animethemeentries.videos.audio,images`);
                const data = await response.json();
                const firstAnime = data.anime?.[0] || null;
                setAnime(firstAnime);
            } catch (error) {
                console.error('Error fetching anime details:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchAnimeDetails();
    }, [id]);

    if (isLoading) {
        return <div className="AnimeDetails">Loading...</div>;
    }

    if (!anime) {
        return <div className="AnimeDetails">Anime details not found.</div>;
    }

    console.log(anime); // Log the image URL for debugging

    return (
        <div className="AnimeDetails">
            <div className="DetailsCont">
                <div className="AnimeDetailsContainer">
                    <h1>{anime.name || 'Unknown Title'}</h1>
                    <img className="animImg" src={anime.images[0].link}></img>
                    <div className="animDesc">
                        <label><strong>Type: {anime.media_format}</strong> {}</label>
                        <label><strong>Year: {anime.year} {anime.season}</strong> {}</label>
                        <label><strong>Description: {anime.synopsis}</strong> {}</label>
                    </div>
                </div>
                <div className="videoContainer">
                    <h1>Video</h1>
                    <video className="vid" controls preload="auto" poster="placeholder-image.jpg">
                        <source src={anime.animethemes?.[0]?.animethemeentries?.[0]?.videos?.[0]?.link} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h1>Audio</h1>
                    <audio className="audio" controls preload="none">
                        <source src={anime.animethemes?.[0]?.animethemeentries?.[0]?.videos?.[0]?.audio.link} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            </div>
            <div className="animePost">
                <h2>Anime Posts</h2>
                <div className="animePostContainer">
            </div>
            </div>
        </div>
    );
}

export default AnimeDetails;