import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PostList from '../components/PostList'
import FloatingActionButton from '../components/FloatingActionButton'
import NewpostModalForm from '../components/NewpostModalForm'
import { fetchPosts } from '../features/posts/postSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'

const FeedPage = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { posts, error } = useSelector((state) => state.posts);
    const [isModalOpen, setisModalOpen] = useState(false);
    const limit = 10; // Posts per page
	const navigate = useNavigate();

    const handleClose = () => {
        setisModalOpen(false);
    }

    const handleOpen = () => {
        // setisModalOpen(true);
		navigate("/new-post");
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

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);
  return (
    <div>
      <Header/>
	  <div className='p-4'>
		<h1 className='font-bold mb-4'>Feeds</h1>
		<div>
			{posts.map((post) => (
				<Post post={post} key={post.id}/>
		))}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
		</div>
		<FloatingActionButton handleClick={handleOpen}/>
	  </div>
      {/* <NewpostModalForm isOpen={isModalOpen} handleClose={handleClose}/> */}
    </div>
  )
}

export default FeedPage
