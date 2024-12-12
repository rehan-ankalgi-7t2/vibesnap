import { Avatar, Button } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

const Post = ({post}) => {
  return (
    <article className='w-full mx-auto bg-gray-100 p-4 rounded-xl' style={{
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
                <span className='text-sky-400' key={idx++}>#{ht}</span>
            )) }
        </div>
        {post.media.length < 2 ?
        <img src={post.media[0]} className='w-full bg-cover rounded-xl'/>:
        slider}
        <div className='pt-4 flex flex-row items-center justify-between'>
              <Button variant='contained' sx={{backgroundColor: 'lightpink', borderRadius: 8, fontWeight: 700}} endIcon={<FavoriteIcon color='orange'/>} disableElevation>{post.likes}</Button>
              <Button variant='outlined' sx={{ borderRadius: 8 }} color='disabled' className='rounded-2xl' endIcon={<SendIcon color='red'/>} disableElevation>share</Button>
        </div>
    </article>
  )
}

export default Post
