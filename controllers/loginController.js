const knex = require("knex")(require("../knexfile"));
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = {
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.select("*")
      .from("user")
      .where("user_name", username)
      .then((results) => {
        if (results.length === 0) {
          return res.status(401).json({ message: "Authentication failed" });
        }

        const user = results[0];

        bcrypt.compare(password, user.user_password, (bcryptErr, bcryptRes) => {
          if (bcryptErr || !bcryptRes) {
            return res.status(401).json({ message: "Authentication failed" });
          }

          const token = jwt.sign({ userId: user.id }, "your_secret_key", {
            expiresIn: "1h",
          });

          res.status(200).json({ message: "Authentication successful", token });
        });
      });
  },
};

module.exports = loginController;
