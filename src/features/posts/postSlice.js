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

export const fetchProfilePosts = createAsyncThunk("posts/fetchProfilePosts", async ({ page, limit }, { rejectWithValue }) => {
	try {
		const user = JSON.parse(localStorage.getItem('vibesnapUser'));
		const start = (page - 1) * limit;
		const end = start + limit - 1;

		// Fetch posts from Supabase with pagination
		const { data, error } = await supabase
			.from("posts")
			.select()
			.eq('author_id', user?.id)
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
        const { data: newPost, error: insertError } = await supabase
            .from('posts')
            .insert({
				author_id: postData?.author_id,
				content: postData.description,
				media: postData.mediaFiles,
				hashtags: postData.hashtags
			})
            .select()
			.single()


        if (insertError) {
            return rejectWithValue("Error publishing new post")
        }

		console.log("DATA FROM DB AFTER PUBLISHING: ", newPost);
		return newPost;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const likePost = createAsyncThunk("posts/likePost", async ({postId, userId}, {rejectWithValue}) => {
	try {
		const { data, error: updateError } = await supabase
			.from("posts")
			.update({ likes: supabase.raw("likes + 1") })
			.eq("id", postId);

		if (updateError) {
			return rejectWithValue("failed to like the post");
		}

		return { postId, userId }; // Return the updated post ID and user ID
	} catch (error) {
		return rejectWithValue(error.message);
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
            })
			.addCase(fetchProfilePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
			.addCase(fetchProfilePosts.fulfilled, (state, action) => {
                state.loading = false;
                // state.posts = [...state.posts, ...action.payload]
				console.log(action.payload)
                state.posts = [...action.payload]
            })
			.addCase(fetchProfilePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
			.addCase(createNewPost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createNewPost.fulfilled, (state, action) => {
				state.loading = false;
				// state.posts = [...state.posts, ...action.payload]
				state.posts = [...state.posts, action.payload]
			})
			.addCase(createNewPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				const { postId } = action.payload;

				// Update the likes count for the specific post in place
				const post = state.posts.find((post) => post.id === postId);
				if (post) {
					post.likes += 1; // Optimistically update likes
				}
			})
			.addCase(likePost.rejected, (state, action) => {
				state.error = action.payload;
			});
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsError } = postSlice.actions;
export default postSlice.reducer;
