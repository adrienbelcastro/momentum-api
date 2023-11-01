const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect();

const registrationController = {
  register: (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    const selectQuery =
      "SELECT id FROM user WHERE user_name = ? OR user_email = ?";

    connection.query(selectQuery, [username, email], (error, existingUsers) => {
      if (error) {
        console.error(`Error checking exissting users: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (existingUsers.length > 0) {
        return res
          .status(400)
          .json({ message: "Username or email already used" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }

        const insertQuery =
          "INSERT INTO user (id, user_name, user_email, user_password, phone_number) VALUES (?,?,?,?,?)";
        const userId = uniqid();

        connection.query(
          insertQuery,
          [userId, username, email, hashedPassword, phone],
          (insertError) => {
            if (insertError) {
              console.error("Error inserting user:", err);
              res.status(500).json({ message: "Internal server error" });
            }
            res.status(201).json({ message: "Registration successful" });
          }
        );
      });
    });
  },
};

module.exports = registrationController;
