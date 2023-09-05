const knex = require("knex")(require("../knexfile"));

exports.updateUser = (res, req) => {
  if (!username || !password || !email || !phone) {
    return res
      .status(400)
      .send("Not valid username, password, email address or phone number");
  }

  knex("user")
    .update(req.body)
    .where({ id: req.params.id })
    .then((data) => {
      if (!data) {
        res.status(404).send(`Account doesn't exist`);
      } else {
        req.body.id = req.params.id;
        res.status(200).send(req.body);
      }
    })
    .catch((err) => {
      res.status(404).send(`Error updating Account ${req.oarams.id} ${err}`);
    });
};
