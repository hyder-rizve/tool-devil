const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const db = require("./config/db");

dotenv.config();

// Import all routes
const userRoute = require("./routes/userRoute");
const sub_categoryRoute = require("./routes/sub_categoryRoute");
const productRoute = require("./routes/productRoute");
//const orderRoute = require("./routes/orderRoute");
const categoryRoute = require("./routes/categoryRoute");
//const brandRoute = require("./routes/brandRoute");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", userRoute);
app.use("/api", sub_categoryRoute);
app.use("/api", productRoute);
//app.use("/api", orderRoute);
app.use("/api", categoryRoute);
//app.use("/api", brandRoute);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Tool Devil API",
    version: "1.0.0",
    endpoints: {
      user: "/api/user",
      brand: "/api/brand",
      product: "/api/product",
      sub_category: "/api/sub_category",
      order: "/api/order",
      category: "/api/category",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
