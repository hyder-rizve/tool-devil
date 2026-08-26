const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const db = require("./config/db");

dotenv.config();

// Import all routes
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const productRoutes = require("./routes/productRoutes");
const staffRoutes = require("./routes/staffRoutes");
const clientRoutes = require("./routes/clientRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const productCategoryRoutes = require("./routes/ProductCategoryRoutes");
const serviceCategoryRoutes = require("./routes/ServiceCategoryRoutes");
const reportRoutes = require("./routes/reportRoutes");
const messageRoutes = require("./routes/messageRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", userRoutes);
app.use("/api", serviceRoutes);
app.use("/api", productRoutes);
app.use("/api", staffRoutes);
app.use("/api", clientRoutes);
app.use("/api", expenseRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", settingsRoutes);
app.use("/api", productCategoryRoutes);
app.use("/api", serviceCategoryRoutes);
app.use("/api", bookingRoutes);
app.use("/api", reportRoutes);
app.use("/api", messageRoutes);
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Login successful
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Salon Management API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      services: "/api/services",
      products: "/api/products",
      staff: "/api/staff",
      clients: "/api/clients",
      expenses: "/api/expenses",
      inventory: "/api/inventory",
      settings: "/api/settings",
      bookings: "/api/bookings",
      messages: "/api/messages",
      bookingsByDate: "/api/bookings/date/:date",
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
