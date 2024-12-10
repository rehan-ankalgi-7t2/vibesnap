import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../features/user/userActions';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({});
    const userData = useSelector((state) => state.user);

    // const fetchProfile = async (username) => {
    //     const result = await getUserProfile(username);
    //     console.log(result);
    // }

    console.log(userData)

    // useEffect(() => {
    //     fetchProfile(user.username);
    // }, [])

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}

export default ProfilePage
