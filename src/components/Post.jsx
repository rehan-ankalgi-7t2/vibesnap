import { Avatar, Button } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { likePost } from '../features/posts/postSlice';

const Post = ({post}) => {
	const dispatch = useDispatch();

	const handleLike = async (postId, userId) => {
		dispatch(likePost({postId, userId}))
		.unwrap()
		.then(() => {

		})
		.catch((error) => {

		})
	}

  return (
    <article className='w-full mx-auto bg-gray-100 p-4 rounded-xl mb-4' style={{
        //   backgroundImage: `url("${post.media[0]}")`,
        backgroundColor: "#eeea",
		backgroundSize: "cover",
		backgroundPosition: "center",
    }}>
        <div className='flex flex-row gap-4'>
              <Avatar sx={{
                  width: 48,
                  height: 48,
              }} alt={post?.users?.username} src={post?.users?.avatar} />
              <div>
                  <h3 className='m-0'>{post?.users?.username}</h3>
                  <span className='text-xs opacity-40 mt-0'>2 hours ago</span>
              </div>
        </div>
        <p className='py-4'>{post.content}</p>
        <div className='pb-4'>
            {post.hashtags?.map((ht, idx=0) => (
                <span className='text-sky-400 mr-2 mb-2' key={idx++}>#{ht}</span>
            )) }
        </div>
        {post.media.length < 2 ?
        <img src={post.media[0]} className='w-full bg-cover rounded-xl'/>:
        slider}
        <div className='pt-4 flex flex-row items-center justify-between'>
              <Button variant='contained' onClick={handleLike(post.id, post.author_id)} sx={{backgroundColor: 'lightpink', borderRadius: 8, fontWeight: 700}} endIcon={<FavoriteIcon color='orange'/>} disableElevation>{post.likes}</Button>
              <Button variant='outlined' sx={{ borderRadius: 8 }} color='disabled' className='rounded-2xl' endIcon={<SendIcon color='red'/>} disableElevation>share</Button>
        </div>
    </article>
  )
}

export default Post
