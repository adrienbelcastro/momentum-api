const uniqid = require("uniqid");
const mysql = require("mysql2");
const { PoolConnection } = require("mysql2/typings/mysql/lib/PoolConnection");
const pool = mysql.createPool(process.env.DATABASE_URL);

exports.getMacros = (req, res) => {
  pool
    .getConnection()
    .then((connection) => {
      return connection
        .query("SELECT * FROM diary")
        .then(([results]) => {
          connection.release();
          res.status(200).json(results);
        })
        .catch((error) => {
          console.error("Error getting article:", error);
          res.status(400).send("Error Getting Article");
        });
    })
    .catch((error) => {
      console.error("Error acquiring database connection:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.postMacros = (req, res) => {
  const body = req.body;

  if (
    !body.name ||
    !body.meal_type ||
    !body.calories ||
    !body.carbohydrates ||
    !body.fats ||
    !body.protein
  ) {
    return res.status(400).send("Invalid Nutritional Information");
  }
  const recipe_id = uniqid();
  const query =
    "INSERT INTO diary (recipe_id, name, meal_type, calories, carbohydrates, fats, protein) VALUES (?,?,?,?,?,?,?)";
  const values = [
    recipe_id,
    body.name,
    body.meal_type,
    body.calories,
    body.carbohydrates,
    body.fats,
    body.protein,
  ];

  pool
    .getConnection()
    .then((connection) => {
      return connection
        .query(query, values)
        .then((results) => {
          connection.release();
          res.status(200).json(results);
        })
        .catch((error) => {
          console.error("Error getting article:", error);
          res.status(400).send("Error inserting into diary");
        });
    })
    .catch((error) => {
      console.error("Error acquiring database connection:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.deleteMacro = (req, res) => {
  const recipeId = req.params.id;
  const query = "DELETE FROM diary WHERE recipe_id = ? ";

  PoolConnection.getConnection()
    .then((connection) => {
      return connection
        .query(query, [recipeId])
        .then((results) => {
          connection.release();
          if (results.affectedRows === 0) {
            res.status(404).send(`No recipe with ID ${recipeId} exists`);
          } else {
            res
              .status(204)
              .send(`Recipe with ID: ${recipeId} has been deleted`);
          }
        })
        .catch((error) => {
          console.error(`Error deleting recipe ${recipeId}: ${error}`);
          res.status(500).send(`Error deleting recipe ${recipeId}: ${error}`);
        });
    })
    .catch((error) => {
      console.error("Error acquiring database connection:", error);
      res.status(500).send("Internal Server Error");
    });
};
