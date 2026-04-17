const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
