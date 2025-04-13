const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const instructorRoutes = require("./src/routes/instructorRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const lectureRoutes = require("./src/routes/lectureRoutes");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connect to MongoDB Atlas"))
.catch((err)=> console.log("MongoDB Error : ",err))

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true                // If you're sending cookies or authorization headers
}));

app.use(express.json());   //allows parseing json in requests
app.use("/instructors", instructorRoutes);
app.use("/courses",courseRoutes);
app.use("/lectures",lectureRoutes);


//Test route
app.get("/", (req, res) => {
    res.send("API is Running...");
});

//start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})