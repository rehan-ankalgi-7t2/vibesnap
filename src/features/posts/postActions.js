// postActions.js
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { fetchPostsStart, fetchPostsSuccess, fetchPostsError } from "./postSlice";
import { db } from "../../services/firebase";

export const fetchPosts = () => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("MALIIIIIIIIIK", posts)
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        dispatch(fetchPostsError(error.message));
    }
};

export const fetchPostsFromSupabase = () => async (dispatch) => {
    dispatch(fetchPostsStart());

    try {
        const { data, error } = await supabase
            .from('posts')
            .select()
            .order('created_at', {ascending: false})

        if(data){
            dispatch(fetchPostsSuccess({posts: data.data}));
        }

        if(error){
            dispatch(fetchPostsError(error.message));
        }
    } catch (error) {
        dispatch(fetchPostsError(error.message));
    }
}

export const createNewPost = () => async (dispatch) => {
    dispatch(fetchPostsStart());

    try {
        const { data, error } = await supabase
            .from('posts')
            .select()
            .order('created_at', { ascending: false })

        if (data) {
            dispatch(fetchPostsSuccess({ posts: data.data }));
        }

        if (error) {
            dispatch(fetchPostsError(error.message));
        }
    } catch (error) {
        dispatch(fetchPostsError(error.message));
    }
}