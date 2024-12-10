import { createBrowserRouter } from "react-router-dom";
import Notfound from "../components/Notfound";
import App from "../App";
import FeedPage from "../pages/FeedPage";
import ProfilePage from "../pages/ProfilePage";
import Signin from "../pages/Signin";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "feed", // Relative path to `/app/feed`
                element: <ProtectedRoute>
                        <FeedPage />,
                    </ProtectedRoute>
            },
            {
                path: "profile", // Relative path to `/app/profile`
                element: 
                <ProtectedRoute>
                    <ProfilePage />,
                </ProtectedRoute>
            },
        ],
    },
    {
        path: "/signin",
        element: <Signin/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "*", // Matches any undefined route
        element: <Notfound />,
    },
]);

export default routes;