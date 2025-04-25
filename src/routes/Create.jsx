import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'
import './Create.css'

function Create() {
    const id = useParams(); // Get the ID from the URL if needed
    const [user, setUser] = useState('');
    const [anime, setAnime] = useState('');
    const [animeId, setAnimeId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode

    useEffect(() => {
        // Check if editing mode is enabled (e.g., based on URL or props)
        const editing = window.location.pathname.includes('edit'); // Example logic
        setIsEditing(editing);
    }, []);

    useEffect(() => {
        if (isEditing) {
            // Fetch the post data based on the ID from the URL
            const fetchPostData = async () => {
                const { data, error } = await supabase
                    .from('animePosts')
                    .select('*')
                    .eq('id', id.id) // Use the ID from the URL
                    .single();
    
                if (error) {
                    console.error('Error fetching post data:', error.message);
                    return;
                }
    
                if (data) {
                    setUser(data.user);
                    setAnime(data.anime);
                    setAnimeId(data.animeId);
                    setTitle(data.title);
                    setContent(data.content);
                    setImageUrl(data.image);
                }
            };
    
            fetchPostData();
        }
    }, [isEditing, id.id]); // Dependency array ensures this runs only when `isEditing` or `id.id` changes

    const handleEdit = async (event) => {
        event.preventDefault();

        // Validation check for empty fields
        if (!user || !anime || !animeId || !title || !content) {
            alert('All fields are required. Please fill out every field.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('animePosts')
                .update({ user, anime, animeId, title, content, image})
                .eq('id', id.id); // Use the ID from the URL

            if (error) {
                throw error; // Throw error to be caught in the catch block
            }

            alert('Post updated successfully!');
            window.location = "/home"; // Redirect only after successful update
        } catch (error) {
            console.error('Error updating data:', error.message);
            alert('An error occurred while updating the post. Please try again.');
        }
    }

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
                .insert({ user: user, anime: anime, animeId: animeId, title: title, content: content, image: image}) // Added votes field with default value;

            if (error) {
                throw error; // Throw error to be caught in the catch block
            }

            alert('Post created successfully!');
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
                        placeholder="Enter your Anime. Ensure this is spelted correctly"
                        className="titleInput"
                        value={anime}
                        onChange={(e) => setAnime(e.target.value)}
                    />
                </div>
                <div className="titleHolder">
                    <h2>AnimeId:</h2>
                    <input
                        type="text"
                        placeholder="Enter Anime ID. Ensure this is correct. Please grab the id from it's anime"
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
                <div className="titleHolder">
                    <h2>Image(Optional):</h2>
                    <input
                        type="text"
                        placeholder="Enter an image url"
                        className="titleInput"
                        value={image}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="createButtonContainerForCreate">
                    <Link to="/home"><button className="createButtonForCreate"> Back </button></Link>
                    <button
                        className="createButtonForCreate"
                        onClick={isEditing ? handleEdit : createPost}
                    >
                        {isEditing ? 'Edit' : 'Post'} {/* Dynamic button text */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Create