import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PostList from '../components/PostList'
import FloatingActionButton from '../components/FloatingActionButton'
import NewpostModalForm from '../components/NewpostModalForm'
import { fetchPosts } from '../features/posts/postSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const FeedPage = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { posts, error } = useSelector((state) => state.posts);
    const [isModalOpen, setisModalOpen] = useState(false);
    const limit = 10; // Posts per page

    console.log("YO THARE POSTS!", posts);
    
    const handleClose = () => {
        setisModalOpen(false);
    }
    
    const handleOpen = () => {
        setisModalOpen(true);
    }

    const loadMorePosts = async () => {
        setLoading(true);
        await dispatch(fetchPosts({ page, limit }));
        setLoading(false);
    };

    useEffect(() => {
        loadMorePosts();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div>
      <Header/>
      <div>
          {posts.map((post) => (
            
              <p>{post.content}</p>
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
      </div>
      <FloatingActionButton handleClick={handleOpen}/>
      <NewpostModalForm isOpen={isModalOpen} handleClose={handleClose}/>
    </div>
  )
}

export default FeedPage
