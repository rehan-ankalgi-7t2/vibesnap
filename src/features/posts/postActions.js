// import { collection, getDoc, getDocs, query } from "firebase/firestore";
// import { fetchPostsStart, fetchPostsSuccess, fetchPostsError } from "./postSlice";
// import { db } from "../../services/firebase";

// export const fetchPosts = () => async (dispatch) => {
//     dispatch(fetchPostsStart());
//     try {
//         const q = query(collection(db, "posts"));
//         const querySnapshot = await getDocs(q);
//         const posts = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         dispatch(fetchPostsSuccess(posts));
//     } catch (error) {
//         dispatch(fetchPostsError(error.message));
//     }
// };

// export const fetchPostsFromSupabase = () => async (dispatch) => {
//     dispatch(fetchPostsStart());

//     try {
//         const { data, error } = await supabase
//             .from('posts')
//             .select()
//             .order('created_at', {ascending: false})

//         if(data){
//             dispatch(fetchPostsSuccess({posts: data.data}));
//         }

//         if(error){
//             dispatch(fetchPostsError(error.message));
//         }
//     } catch (error) {
//         dispatch(fetchPostsError(error.message));
//     }
// }

// export const createNewPost = async (postData) => {
//     try {
//         // upload all files to the bucket
//         // retrive all the file links

//         // insert the post in the db
//         const { error } = await supabase
//             .from('posts')
//             .insert({
//                 // post data
//             })

//         if (error) {
//             return customResponse(false, 'error creating post', null, error)
//         }
//     } catch (error) {
//         console.error(error.message)
//     }
// }

// export const deletePost = async (dispatch) => {
//     try {
//         const { error } = await supabase
//             .from('posts')
//             .delete()
//             .eq('id', {/* selected id */})

//         if (error) {
//             return customResponse(false, 'error deleting post', null, error)
//         }
//     } catch (error) {
//         console.error(error.message)
//     }
// }

// export const updatePost = () => async (dispatch) => {
//     dispatch(fetchPostsStart());

//     try {
//         const { data, error } = await supabase
//             .from('posts')
//             .update({
//                 // fields
//             })
//             .eq('id', {/* selected id */ })

//         if (data) {
//             dispatch(fetchPostsSuccess({ posts: data.data }));
//         }

//         if (error) {
//             dispatch(fetchPostsError(error.message));
//         }
//     } catch (error) {
//         dispatch(fetchPostsError(error.message));
//     }
// }
