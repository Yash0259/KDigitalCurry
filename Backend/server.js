const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true                // If you're sending cookies or authorization headers
}));

app.use(express.json());   //allows parseing json in requests
app.use("/users", userRoutes);

//Test route
app.get("/", (req, res) => {
    res.send("API is Running...");
});

//start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})