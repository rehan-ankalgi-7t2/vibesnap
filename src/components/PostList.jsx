import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postSlice';
import Post from './Post';

const PostList = () => {
    const dispatch = useDispatch();
    const { data: posts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <div className='mx-auto py-10'>
      {posts.map((post, idx) =>
        <Post post={post} key={post.id}/>
      )}
    </div>
  )
}

export default PostList
