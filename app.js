const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/", schoolRoutes);

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
