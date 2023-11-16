const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect();

app.options("*", cors());

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const diaryRoute = require("./routes/diaryRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

app.use(express.json());

app.use("/meals", diaryRoute);
app.use("/article", articlesRoutes);
app.use("/login", loginRoutes);
app.use("/register", registrationRoutes);

app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
