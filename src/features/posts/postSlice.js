// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchPostsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.data = action.payload;
            state.loading = false;
        },
        fetchPostsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsError } = postSlice.actions;
export default postSlice.reducer;
