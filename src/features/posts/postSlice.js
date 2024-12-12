import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseService";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({page, limit}, {rejectWithValue}) => {
    try {
        const start = (page - 1) * limit;
        const end = start + limit - 1;

        // Fetch posts from Supabase with pagination
        const { data, error } = await supabase
            .from("posts")
			.select(`
				*,
				users:author_id (
					id,
					username,
					email,
					avatar
				)
			`)
            .order("created_at", { ascending: false })
            .range(start, end);

        if (error) {
            return rejectWithValue(error.message);
        }

        return data;
    } catch (error) {
        rejectWithValue(error.message);
    }
})

export const createNewPost = createAsyncThunk("posts/createNewPost", async (postData, {rejectWithValue}) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([
                { author_id: postData?.author_id, content: postData.description, media: postData.mediaFiles, hashtags: postData.hashtags },
            ])
            .select()


        if (error) {
            return customResponse(false, 'error creating post', null, error)
        }

		return data;
    } catch (error) {
        rejectWithValue(error.message);
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                // state.posts = [...state.posts, ...action.payload]
                state.posts = [...action.payload]
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsError } = postSlice.actions;
export default postSlice.reducer;
