const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect();

const loginController = {
  login: (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    const selectQuery = "SELECT * FROM  user WHERE user_name = ?";

    connection.query(selectQuery, [username], (error, results) => {
      if (error) {
        console.error(`Error selecting user: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = results[0];

      bcrypt.compare(password, user.user_password, (bcryptErr, bcryptRes) => {
        if (bcryptErr || !bcryptRes) {
          return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
          { userId: user.id },
          console.log(process.env.JWT_SECRET_KEY),
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ message: "Authentication successful", token });
      });
    });
  },
};

module.exports = loginController;
