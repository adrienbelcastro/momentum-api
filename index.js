const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const uniqid = require("uniqid");

const diaryRoute = require("./routes/diaryRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const goalsRoutes = require("./routes/goalsRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).send("This is not a VALID JSON!");
  }
  next();
});

app.use("/", diaryRoute);
app.use("/", articlesRoutes);
app.use("/", goalsRoutes);

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
