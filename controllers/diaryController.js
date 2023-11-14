const uniqid = require("uniqid");
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect();

exports.getMacros = (req, res) => {
  const query = "SELECT * FROM diary";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting article:", error);
      res.status(400).send("Error Getting Article");
    } else {
      res.status(200).json(results);
    }
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

  connection.query(query, values, (error, results) => {
    if (error) {
      if (error) {
        console.error("Error getting article:", error);
        res.status(400).send("Error inserting into diary");
      } else {
        res.status(200).json(results);
      }
    }
  });
};

exports.deleteMacro = (req, res) => {
  const recipeId = req.params.id;

  const query = "DELETE FROM diary WHERE recipe_id = ? ";

  connection.query(query, [recipeId], (error, results) => {
    if (error) {
      console.error(`Error deleting recipe ${recipeId}: ${error}`);
      res.status(500).send(`Error deleting recipe ${recipeId}: ${error}`);
    } else if (results.affectedRows === 0) {
      res.status(404).send(`No recipe with ID ${recipeId} exists`);
    } else {
      res.status(204).send(`Recipe with ID: ${recipeId} has been deleted`);
    }
  });
};
