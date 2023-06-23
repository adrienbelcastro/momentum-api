const knex = require("knex")(require("../knexfile"));

exports.getArticlesList = (req, res) => {
  knex("articles")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error Getting Article Data`);
    });
};

exports.singleArticle = (req, res) => {
  knex("articles")
    .select("article.id", "article.content", "article.image", "article.title")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(`Error getting article`));
};
