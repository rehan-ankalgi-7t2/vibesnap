import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('vibesnapToken') || ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('vibesnapToken', action.payload.token)
        },
        removeToken: (state) => {
            state.token = ''
            localStorage.removeItem('vibesnapToken')
        },
        getToken: (state) => {
            return state.token || localStorage.getItem('vibesnapToken')
        }
    }   
})

export const {setToken, removeToken, getToken} = authSlice.actions;
export default authSlice.reducer