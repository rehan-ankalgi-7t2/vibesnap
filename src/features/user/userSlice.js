import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// thunks
export const updateCoverImage = createAsyncThunk(
    'user/updateCoverImage', // Action type
    async (arg, thunkAPI) => {
        try {
            // async logic
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Handle errors
        }
    }
);

export const updateAvatar = createAsyncThunk(
    'user/updateAvatar', // Action type
    async (arg, thunkAPI) => {
        try {
            // async logic
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Handle errors
        }
    }
);

export const updateBio = createAsyncThunk(
    'user/updateBio', // Action type
    async (arg, thunkAPI) => {
        try {
            // async logic
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Handle errors
        }
    }
);

const initialState = {
    userProfile: null,
    isLoading: false,
    isError: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(googleSignIn.pending, (state) => {
    //         state.isLoading = true;
    //         state.error = null;
    //     })
    //     .addCase(googleSignIn.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.user = action.payload;
    //     })
    //     .addCase(googleSignIn.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     });
    // }
})

export const {setUser, getUser} = userSlice.actions;
export default userSlice.reducer;
