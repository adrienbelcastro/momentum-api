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
  console.log(req.body);
  if (
    !req.body.name ||
    !req.body.meal_type ||
    !req.body.calories ||
    !req.body.carbohydrates ||
    !req.body.fats ||
    !req.body.protein
  ) {
    console.log(req.body);
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

exports.deleteMacro = (req, res) => {
  knex("diary")
    .delete()
    .where({ recipe_id: req.body.recipe_id })
    .then((data) => {
      if (!data) {
        res.status(404).send(`No recipe with ID ${req.body.recipe_id} exists`);
      } else {
        knex("diary")
          .delete()
          .where({ recipe_id: req.body.recipe_id })
          .then(() =>
            res
              .status(204)
              .send(`Recipe with id: ${req.body.recipe_id} has been deleted`)
          );
      }
    })
    .catch((err) => {
      console.log(req.body);
      res
        .status(404)
        .send(`Error deleting recipe ${req.body.recipe_id}: ${err}`);
    });
};
