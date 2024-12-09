import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        user: userReducer
    }
})
