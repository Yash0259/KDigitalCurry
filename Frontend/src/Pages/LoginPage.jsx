import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async () => {
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            const { user, token } = data;

            // Store token and user info in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);

            // Navigate based on userType
            if (user.userType === "admin") {
                navigate("/adminPage");
            } else if (user.userType === "student") {
                navigate("/userpage");
            } else {
                setError("Unknown user type.");
            }

        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong during login.");
        }
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url('/bg3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 4,
                    width: 350,
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Student Management
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, marginBottom: 2 }}>
                    Keep it all together and you'll be fine
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    InputProps={{ style: { color: "#fff" } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} sx={{ color: "#fff" }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { color: "#fff" },
                    }}
                />

                {error && (
                    <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>
                )}

                <Typography
                    variant="body2"
                    sx={{ textAlign: "left", cursor: "pointer", opacity: 0.7, marginBottom: 2 }}
                    onClick={() => navigate("/newuser")}
                >
                    Registration for New User
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#a855f7", marginBottom: 2 }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginPage;
