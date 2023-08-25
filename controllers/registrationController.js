const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const db = require("../db");
const uniqid = require("uniqid");

const registrationController = {
  register: (req, res) => {
    const username = req.body.user_name;
    const email = req.body.user_email;
    const password = req.body.user_password;
    const phone = req.body.phone_number;

    db.select("id")
      .from("user")
      .where("user_name", username)
      .orWhere("user_email", email)
      .then((existingUsers) => {
        if (existingUsers.length > 0) {
          return res
            .status(400)
            .json({ message: "Username or email already used" });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ message: "Error hashing password" });
          }

          db("user")
            .insert({
              id: uniqid(),
              user_name: username,
              user_email: email,
              user_password: hashedPassword,
              phone_number: phone,
            })
            .then(() => {
              res.status(201).json({ message: "Registration successful" });
            })
            .catch((err) => {
              console.error("Error inserting user:", err);
              res.status(500).json({ message: "Internal server error" });
            });
        });
      })
      .catch((err) => {
        console.error("Error checking existing users", err);
        res.status(500).json({ message: "Internal server error" });
      });
  },
};

module.exports = registrationController;
