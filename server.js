import cors from "cors";
const express = require("express");
require("dotenv").config();

const app = express();

const connectDB = require("./config/db");
connectDB();
const todoRoutes  =  require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/api", todoRoutes);
app.use("/auth", authRoutes);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

//app.get("/", (req, res) => {
// res.send("Server is running 🚀");
//});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});