import { createBrowserRouter } from "react-router-dom";
import Notfound from "../components/Notfound";
import App from "../App";

const routes = createBrowserRouter([
    {
        path: "*",
        element: <Notfound/>
    },
    {
        path: '/',
        element: <App/>,
        children: [

        ]
    },
])

export default routes;