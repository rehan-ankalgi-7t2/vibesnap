import { Avatar, Button } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

const Post = ({post}) => {
  return (
    <article className='w-[50%] mx-auto bg-gray-100 p-8 rounded-3xl'>
        <div className='flex flex-row gap-4'>
              <Avatar sx={{
                  width: 56,
                  height: 56,
              }} alt="Remy Sharp" src="https://cdn3d.iconscout.com/3d/premium/thumb/man-3d-icon-download-in-png-blend-fbx-gltf-file-formats--male-person-happy-people-human-avatar-pack-icons-7590876.png?f=webp" />
              <div>
                  <span>User name</span>
                  <h3>User name</h3>
              </div>
        </div>
        <p className='py-4'>{post.description}</p>
        <div className='pb-4'>
            {post.hashtags.map((ht) => (
                <span className='text-sky-400'>{ht}</span>
            )) }
        </div>
        {post.media.length < 2 ? 
        <img src={post.media[0]} className='w-full bg-cover rounded-xl'/>:
        slider}
        <div className='pt-4 flex flex-row items-center justify-between'>
             <Button variant='contained' className='rounded-2xl' endIcon={<FavoriteIcon color='red'/>} disableElevation>{post.likes}</Button> 
             <Button variant='outlined' color='disabled' className='rounded-2xl' endIcon={<SendIcon color='red'/>} disableElevation>share</Button> 
        </div>
    </article>
  )
}

export default Post
