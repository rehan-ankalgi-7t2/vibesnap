import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginWithGoogle = () => {
        console.log("Google login clicked");
        // Add logic to handle Google login
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        // Add logic to handle email/password login
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                minHeight: "100vh",
                padding: 2,
                backgroundImage: ''
            }}
        >
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    maxWidth: 320,
                    width: "100%",
                    padding: 3,
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Login
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        fullWidth
                        onClick={handleLoginWithGoogle}
                    >
                        Login with Google
                    </Button>
                </Stack>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 2 }}
                >
                    Don't have an account?{" "}
                    <Link
                        component="button"
                        onClick={() => navigate("/signup")}
                        underline="hover"
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
