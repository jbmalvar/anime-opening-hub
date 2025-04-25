import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimeComp from '../components/AnimeComp';
import './Anime.css';

const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function Anime() {
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState(''); // Track the input value

  useEffect(() => {
    const fetchAnimeData = async () => {
      setIsLoading(true); // Show loading state
      try {
        let response = '';
        if (searchQuery === '') {
          response = await fetch(
            `${API_URL}/anime?include=images&page[size]=28&page[number]=${currentPage}`
          );
        } else {
          response = await fetch(
            `${API_URL}/anime?include=images&filter[name]=${searchQuery}&page[size]=28&page[number]=${currentPage}`
          );
        }
        const data = await response.json();
        console.log(data); // Log the response to inspect its structure
        setAnimeData(data.anime || []); // Extract the array or set a fallback
      } catch (error) {
        console.error('Error fetching anime data:', error);
      } finally {
        setIsLoading(false); // Hide loading state
      }
    };

    fetchAnimeData();
  }, [currentPage, searchQuery]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the page
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement the page, but not below 1
  };

  const handleSearch = () => {
    setSearchQuery(inputValue); // Update the search query
    setInputValue(''); // Clear the input box
    setCurrentPage(1); // Reset to the first page
  };

  const handleClearSearch = () => {
    setSearchQuery(''); // Clear the search query
    setCurrentPage(1); // Reset to the first page
  };

  if (isLoading) {
    return <div className="Anime">Loading...</div>;
  }

  if (!Array.isArray(animeData) || animeData.length === 0) {
    return <div className="Anime">No anime data available</div>;
  }

  return (
    <div className="Anime">
      <div className="searchLocation">
        <button className="searchButtonAnime" onClick={handleSearch}>Search</button>
        <input
          className="animeSearchBar"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update input value
        />
        {searchQuery && (
          <button className="searchButtonAnime" onClick={handleClearSearch}>
            Clear Search
          </button>
        )}
      </div>
      <div className="AnimeContainer">
        {animeData.map((anime, index) => (
          <Link
            to={`/anime-details/${anime.id}`} // Link to AnimeDetails with anime ID
            key={anime.id || index} // Use a unique key
            style={{ textDecoration: 'none' }} // Optional: Remove underline
          >
            <AnimeComp
              imageUrl={anime.images?.[0].link || 'default-image-url.jpg'} // Fallback for missing images
              title={anime.name || 'Unknown Title'} // Fallback for missing title
            />
          </Link>
        ))}
      </div>
      <div className="animeButtonsContainer">
        <button className="buts28" onClick={handlePrev} disabled={currentPage === 1}>
          Prev 28
        </button>
        <span>Page {currentPage}</span>
        <button className="buts28" onClick={handleNext}>Next 28</button>
      </div>
    </div>
  );
}

export default Anime;