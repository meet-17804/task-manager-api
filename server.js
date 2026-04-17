const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ FIRST create app

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ DB connection
const connectDB = require("./config/db");
connectDB();

// ✅ Routes
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api", todoRoutes);
app.use("/auth", authRoutes);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});