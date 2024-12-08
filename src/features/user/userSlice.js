import { createSlice } from "@reduxjs/toolkit";

initialState = {
    username
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

        },
        getUser: (state, action) => {

        }
    }
})

export const {setUser, getUser} = userSlice.actions;
export default userSlice.reducer;
