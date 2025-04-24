import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import './Create.css'

function Create() {
    const [user, setUser] = useState('');
    const [anime, setAnime] = useState('');
    const [animeId, setAnimeId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createPost = async (event) => {
        event.preventDefault();

        // Validation check for empty fields
        if (!user || !anime || !animeId || !title || !content) {
            alert('All fields are required. Please fill out every field.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('animePosts')
                .insert({ user: user, anime: anime, animeId: animeId, title: title, content: content });

            if (error) {
                throw error; // Throw error to be caught in the catch block
            }

            alert('Post created successfully!');
            console.log('Post created:', data);
            window.location = "/home"; // Redirect only after successful insertion
        } catch (error) {
            console.error('Error inserting data:', error.message);
            alert('An error occurred while creating the post. Please try again.');
        }
    }

    return (
        <div className="Create">
            <div className="createPostContainer">
                <h1 className="CreatePostTitle">Create Post</h1>
                <div className="titleHolder">
                    <h2>User:</h2>
                    <input
                        type="text"
                        placeholder="Enter your user"
                        className="titleInput"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div className="titleHolder">
                    <h2>Anime:</h2>
                    <input
                        type="text"
                        placeholder="Enter your Anime. Ensure this is correct"
                        className="titleInput"
                        value={anime}
                        onChange={(e) => setAnime(e.target.value)}
                    />
                </div>
                <div className="titleHolder">
                    <h2>AnimeId:</h2>
                    <input
                        type="text"
                        placeholder="Enter Anime ID. Ensure this is correct"
                        className="titleInput"
                        value={animeId}
                        onChange={(e) => setAnimeId(e.target.value)}
                    />
                </div>
                <div className="titleHolder">
                    <h2>Title:</h2>
                    <input
                        type="text"
                        placeholder="Enter the title of your post"
                        className="titleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="titleHolder">
                    <h2>Content:</h2>
                    <input
                        type="text"
                        placeholder="Enter what you want to talk about"
                        className="titleInput"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="createButtonContainerForCreate">
                    <Link to="/home"><button className="createButtonForCreate"> Back </button></Link>
                    <button
                        className="createButtonForCreate"
                        onClick={createPost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Create