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
