const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.getArticlesList = (req, res) => {
  const query = "SELECT * FROM articles";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting articles:", error);
      res.status(400).send("Error Getting Article Data");
    } else {
      res.status(200).json(results);
    }
  });
};

exports.singleArticle = (req, res) => {
  const articleId = req.params.id;
  const query = "SELECT * FROM articles WHERE id = ?";

  connection.query(query, [articleId], (error, results) => {
    if (error) {
      console.error("Error getting article:", error);
      res.status(400).send("Error Getting Article");
    } else {
      res.status(200).json(results);
    }
  });
};
