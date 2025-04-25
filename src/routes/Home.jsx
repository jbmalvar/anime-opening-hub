import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Home.css';
import Post from '../components/Post';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState('latest'); // State for sorting option
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('animePosts')
                .select();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    // Filter posts based on search term
    const filteredPosts = posts.filter((post) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            post.anime?.toLowerCase().includes(lowerSearchTerm) || // Match anime name
            post.title?.toLowerCase().includes(lowerSearchTerm)   // Match post title
        );
    });

    // Sort the filtered posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortOption === 'latest') {
            return new Date(b.created_at) - new Date(a.created_at); // Newest first
        } else if (sortOption === 'oldest') {
            return new Date(a.created_at) - new Date(b.created_at); // Oldest first
        } else if (sortOption === 'upvotes') {
            return b.votes - a.votes; // Highest votes first
        }
        return 0;
    });

    return (
        <div className="Home">
            <div className="SearchContainer">
                <div className="titleHolder">
                    <h1 className="searchTitleH1">Search For Post Here</h1>
                    <Link to="/create"><button className="createPostBut">+ Create Post</button></Link>
                </div>
                <input
                    type="text"
                    placeholder="Search using Anime or Post Title"
                    className="searchInput"
                    value={searchTerm} // Bind input to searchTerm state
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                />
                <span className="sortContainer">
                    <label>Sort: </label>
                    <select
                        className="sortSelect"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)} // Update sorting option
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="upvotes">Upvotes</option>
                    </select>
                </span>
            </div>
            <div className="PostsContainer">
                {sortedPosts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        user={post.user}
                        postDate={post.created_at}
                        title={post.title}
                        anime={post.anime}
                        animeId={post.animeId}
                        image={post.image}
                        content={post.content}
                        votes={post.votes}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;