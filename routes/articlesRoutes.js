const express = require("express");
const router = express.Router();
const fs = require("fs");

const articlesController = require("../controllers/articlesController");

router.route("/article").get(articlesController.getArticlesList);

router.route("/article/:articleId").get(articlesController.singleArticle);

module.exports = router;
