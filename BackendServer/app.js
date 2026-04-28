const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

module.exports = app;