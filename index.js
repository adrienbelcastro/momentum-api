const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const uniqid = require("uniqid");

//connect to external db
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect();

const diaryRoute = require("./routes/diaryRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

require("dotenv").config();

const PORT = process.env.DATABASE_URL || 8080;

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
app.use("/", loginRoutes);
app.use("/", registrationRoutes);

//Add a page not found in error states

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
