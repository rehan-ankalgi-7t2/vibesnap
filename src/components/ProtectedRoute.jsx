// ProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // const {token, user} = useSelector((state) => state.auth);
	const user = localStorage.getItem('vibesnapUser') || useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // if (!authToken || authToken === '') {
    //     // Redirect to login if not authenticated
    //     navigate("/login")
    // }

    if(!user || user === ''){
        return <Navigate to={"/login"}/>
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
