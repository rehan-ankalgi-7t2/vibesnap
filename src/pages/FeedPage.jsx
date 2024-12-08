import React, { useState } from 'react'
import Header from '../components/Header'
import PostList from '../components/PostList'
import FloatingActionButton from '../components/FloatingActionButton'
import NewpostModalForm from '../components/NewpostModalForm'

const FeedPage = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const handleClose = () => {
        setisModalOpen(false);
    }
    const handleOpen = () => {
        setisModalOpen(true);
    }
  return (
    <div>
      <Header/>
      <PostList/>
      <FloatingActionButton handleClick={handleOpen}/>
      <NewpostModalForm isOpen={isModalOpen} handleClose={handleClose}/>
    </div>
  )
}

export default FeedPage
