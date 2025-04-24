import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import './Home.css'
import Post from '../components/Post'


function Home() {
    const[posts, setPosts] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
              .from('animePosts')
              .select();
            setPosts(data)
        }

        fetchPosts();
    }, [])

    console.log(posts);
    return (
    <div className="Home">
        <div className ="SearchContainer">
            <div className = "titleHolder">
                <h1 className="searchTitleH1">Search For Post Here</h1>
                <Link to="/create"><button className="createPostBut">+ Create Post</button></Link>
            </div>
            <input type="text" placeholder="Search using by using Anime or Post Title" className="searchInput" />
            <span className = "sortContainer">
                <label>Sort: </label>
                <select className="sortSelect">
                    <option value="latest">Latest</option>
                    <option value="latest">Oldest</option>
                    <option value="latest">Upvotes</option>
                </select>
            </span>
        </div>
        <div className="PostsContainer">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    user={post.user}
                    postDate={post.created_at}
                    title={post.title}
                    anime={post.anime}
                    imageUrl={"https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/2/26/Maomao_%28Anime%29.png/revision/latest/scale-to-width/360?cb=20230819200042"}
                    content={post.content}
                    votes={post.votes}
                />
            ))}
        </div>
    </div>
  )
}

export default Home