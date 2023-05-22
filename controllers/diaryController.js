const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");

exports.getMacros = (req, res) => {
  knex("diary")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error Getting Nutritional Data`);
    });
};

exports.postMacros = (req, res) => {
  if (
    !req.body.date ||
    !req.body.name ||
    !req.body.meal_type ||
    !req.body.calories ||
    !req.body.carbohydrates ||
    !req.body.fats ||
    !req.body.protein
  ) {
    return res.status(400).send("Invalid Nutritional Information");
  }
  req.body.recipe_id = uniqid();

  knex("diary")
    .insert(req.body)
    .then((data) => {
      res.status(201).send(req.body);
    })
    .catch((err) =>
      res.status(400).send(`Error displaying nutrition facts: ${err}`)
    );
};
