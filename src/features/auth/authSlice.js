import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import supabase from "../../services/supabaseService";
import { firebaseApp } from "../../services/firebase";

const auth = getAuth(firebaseApp);

// Async thunk for Google sign-in
export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async (_, { rejectWithValue }) => {
        const provider = new GoogleAuthProvider();

        try {
            // Sign in using Firebase
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Extract token (properly handle null cases)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            if (!token) {
                return rejectWithValue("Failed to retrieve access token.");
            }

            // Check if the user exists in the Supabase database
            const { data: existingUser, error: fetchError } = await supabase
                .from("users")
                .select("*")
                .eq("email", user.email)
                .single(); // Use `.single()` for a single record

            if (fetchError && fetchError.code !== "PGRST116") {
                // Handle errors other than "No rows returned"
                return rejectWithValue(fetchError.message);
            }

            // If user doesn't exist, insert them into the database
            if (!existingUser) {
                const { data: newUser, error: insertError } = await supabase
                    .from("users")
                    .insert({
                        username: user.displayName,
                        first_name: user.displayName.split(" ")[0] || "",
                        last_name: user.displayName.split(" ")[1] || "",
                        email: user.email,
                        avatar: user.photoURL || "",
                        cover_image: "",
                        bio: "",
                    })
                    .select()
                    .single(); // Use `.single()` to get the inserted user

                if (insertError) {
                    return rejectWithValue(insertError.message);
                }

                return {
                    user: newUser,
                    token,
                };
            }

            // Return existing user if found
            return {
                user: existingUser,
                token,
            };
        } catch (error) {
            // Handle Firebase or other errors
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: localStorage.getItem('vibesnapUser') || null,
    token: localStorage.getItem('vibeSnapToken') || '',
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            state.user = null;
			state.token = '';
			localStorage.removeItem('vibeSnapToken');
			localStorage.removeItem('vibesnapUser');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(googleSignIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                localStorage.setItem('vibeSnapToken', action.payload.token)
				localStorage.setItem('vibesnapUser', JSON.stringify(action.payload.user));
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

})

export const {logOut} = authSlice.actions;
export default authSlice.reducer
