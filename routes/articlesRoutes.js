const express = require("express");
const router = express.Router();
const fs = require("fs");

const articlesController = require("../controllers/articlesController");

router.route("/").get(articlesController.getArticlesList);

router.route("/:id").get(articlesController.singleArticle);

module.exports = router;
