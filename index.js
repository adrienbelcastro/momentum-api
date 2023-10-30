const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

connection.connect();

const diaryRoute = require("./routes/diaryRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

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

app.use("/meals", diaryRoute);
app.use("/article", articlesRoutes);
app.use("/login", loginRoutes);
app.use("/register", registrationRoutes);

// app.use((req, res, next) => {
//   con;
// });

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
