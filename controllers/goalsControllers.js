const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");

exports.getGoals = (req, res) => {
  knex("UserWeightLoss")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error Getting Nutritional Data`);
    });
};

exports.postGoals = (req, res) => {
  if (!req.body.date || !req.body.current_weight || !req.body.goalWeight) {
    return res.status(400).send("Invalid Goal! Please Re-enter Information");
  }
  req.body.goal_id = uniqid();

  knex("UserWeightLoss")
    .insert(req.body)
    .then((data) => {
      res.status(201).send(req.body);
    })
    .catch((err) => {
      res.status(400).send(`Error displaying goal: ${err}`);
    });
};
