import { createBrowserRouter } from "react-router-dom";
import Notfound from "../components/Notfound";
import App from "../App";
import FeedPage from "../pages/FeedPage";
import ProfilePage from "../pages/ProfilePage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "feed", // Relative path to `/app/feed`
                element: <FeedPage />,
            },
            {
                path: "profile", // Relative path to `/app/profile`
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "*", // Matches any undefined route
        element: <Notfound />,
    },
]);

export default routes;