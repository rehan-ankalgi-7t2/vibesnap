import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "../../services/firebase";

const auth = getAuth()

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isVerified: user.emailVerified,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Logout failed", error);
    }
};