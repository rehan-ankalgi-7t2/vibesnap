import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        firstName: '',
        lastName: '',
        avatar: '',
        coverImage: '',
        email: '',
        isVerified: false
    },
    reducers: {
        setUser: (state, action) => {
            console.log("USER PAYLOAD", action.payload);
            const payload = action.payload.user;

            state.username = payload.displayName;
            state.firstName = payload.displayName.split(" ")[0];
            state.lastName = payload.displayName.split(" ")[1];
            state.email = payload.email;
            state.avatar = payload.photoURL;
            state.isVerified = payload.emailVerified;
        },
    }
})

export const {setUser, getUser} = userSlice.actions;
export default userSlice.reducer;
