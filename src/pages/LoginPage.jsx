import React, { useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Stack,
    CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import AuthBannerImage from "../assets/images/auth-banner.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { googleSignIn } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleGoogleLogin = async () => {
        try {
            const result = await dispatch(googleSignIn()).unwrap();
            console.log("Login successful:", result);
            toast.success('Login successful', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Colored",
                transition: "Zoom",
            });
            navigate("/");
        } catch (error) {
            toast.error('Login failed', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Colored",
                transition: "Zoom",
            });
            console.error("Login failed:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                minHeight: "100vh",
                backgroundImage: `url(${AuthBannerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        >
            <Box
                sx={{
                    maxWidth: "100%",
                    width: "100%",
                    height: "30vh",
                    padding: 3,
                    backgroundColor: "#fff"
                }}
            >
                    <Typography variant="h5" gutterBottom align="center">📸 Vibesnap</Typography>
                    <Typography variant="body2" align="center">Moments that matter, shared forever</Typography>
                <Box sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Button
                        variant="contained"
                        color="appleBlack"
                        sx={{color: "white"}}
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        // endIcon={isLoading ? <CircularProgress/> : ''}
                    >
                        Login with Google
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
