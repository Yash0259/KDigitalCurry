import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
          console.log("Fetched User:", data);
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (err) {
        console.error("Fetch Failed:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header: Welcome text + Logout button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">
          {user ? `Welcome, ${user.name}` : "Loading..."}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogOut}>
          Logout
        </Button>
      </Box>

      {/* User info */}
      {user && (
        <Paper sx={{ mt: 4, p: 3 ,background:"black",color :"white"}}>
          <Typography>Email: {user.email}</Typography>
          <Typography>Status: {user.status}</Typography>
          <Typography>
            Joined:{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "N/A"}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default UserPage
