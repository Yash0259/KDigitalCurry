import React, { useState } from "react";
import {
    Box, Paper, Typography, TextField, Button, MenuItem, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        language: "",
        mobile: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        const newUser = {
            name: formData.name,
            email: formData.username, // Username is treated as email
            password: formData.password,
            language: formData.language,
            mobile: formData.mobile,
            status: "Active",
        };
    
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert(`User Registered! Activation mail sent to: ${formData.username}`);
                navigate("/");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("Something went wrong.");
        }
    };
    
    const handleCancel = () => {
        navigate("/");
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
                    width: 400,
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    User Registration
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{
                        style: { color: "#fff" },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: "#fff" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{
                        style: { color: "#fff" },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                    sx={{ color: "#fff" }}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                />
                <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                />

                <TextField
                    select
                    label="Language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#ccc" } }}
                >
                    <MenuItem value="EN">English</MenuItem>
                    <MenuItem value="DE">German</MenuItem>
                </TextField>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#a855f7", marginTop: 2 }}
                    onClick={handleSubmit}
                >
                    Register
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ color: "#fff", borderColor: "#fff", marginTop: 1 }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </Paper>
        </Box>
    );
};

export default NewUser;
