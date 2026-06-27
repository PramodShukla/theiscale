require("dotenv").config(); // env variables
const path = require("path");


const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./src/config/db");
connectDB();

//  middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb",extended: true }));
app.use(cors());



app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
);

app.use(
  "/assets",
  express.static(path.join(__dirname, "/assets"))
);


// Admin routes
const adminRoutes = require("./src/routes/adminRoutes");
app.use("/myadmin", adminRoutes);


// User main Routes 
const userAllRoutes = require("./src/routes/userAllRoutes");
app.use("/api", userAllRoutes);



const appAllRoutes = require("./src/routes/appAllRoutes");
app.use("/app", appAllRoutes);



const dataAnalyticsRoutes = require("./src/routes/dataAnalyticsRoutes");
app.use("/DataAnalytics", dataAnalyticsRoutes);



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