// const express = require("express");
// const app = express();
// const PORT = 5000;
// app.use(express.json());

// const userRoutes = require("./src/routes/userRoutes");
// app.use("/api/users", userRoutes);

// const authRoutes = require("./src/routes/authRoutes");
// app.use("/api/auth", authRoutes);

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });


require("dotenv").config(); // env variables

const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./src/config/db");
connectDB();

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  routes
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Dashboard page
const dashboardRoutes = require("./src/routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// myprofile page
const profileRoutes = require("./src/routes/profileRoutes");
app.use("/api/myprofile", profileRoutes);

// update profile and password page ka route
const update_profileRoutes = require("./src/routes/updateProfileRoutes");
app.use("/api/update-profile", update_profileRoutes);

//  default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  404 handler
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

//  PORT from env
const PORT = process.env.PORT || 5000;

//  start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});