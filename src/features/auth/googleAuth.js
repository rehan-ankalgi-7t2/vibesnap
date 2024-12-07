import { GoogleAuthProvider } from "firebase/auth/web-extension";

const provider = new GoogleAuthProvider();
const auth = getAuth()

export {
    provider, auth
}