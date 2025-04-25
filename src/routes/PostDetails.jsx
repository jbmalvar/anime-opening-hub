import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './PostDetails.css'

const API_URL = import.meta.env.VITE_ANIMETHEMES_API_URL;

function PostDetails() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(); // State to store posts
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPost = async () => {
        const { data } = await supabase
            .from('animePosts')
            .select()
            .eq('id', id);
        setPost(data[0]);
    };
    fetchPost();
  }, [id]);

  // useEffect(() => {
  //     const fetchAnimeDetails = async () => {
  //         try {
  //             const response = await fetch(`${API_URL}/anime?filter[anime][id]=${post.animeId}&include=animethemes.animethemeentries.videos.audio,images`);
  //             const data = await response.json();
  //             const firstAnime = data.anime?.[0] || null;
  //             setAnime(firstAnime);
  //         } catch (error) {
  //             console.error('Error fetching anime details:', error);
  //         } finally {
  //             setIsLoading(false); // Stop loading
  //         }
  //     };

  //     fetchAnimeDetails();
  // }, [post.animeId]);

  return (
    <div className="PostDetails">
      {post ? ( // Render only if post is defined
        <div className="PostDetailsContainer">
          <div className="postDetailsTitlePlusImage">
            <img></img>
            <div className="postDetailsTitle">
              <span className="topPartOfIntro">
                <span>{post.user} </span>
                •
                <span> {post?.created_at?.split('T')[0]}</span>
              </span>
              <span className="postAnimeTitle">{post.anime}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading message while fetching data
      )}
    </div>
  );
}

export default PostDetails
