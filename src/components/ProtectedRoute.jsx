// ProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const authToken = useSelector((state) => state.auth.token);

    if (!authToken || authToken === '') {
        // Redirect to login if not authenticated
        return <Navigate to="/signin" />;
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
