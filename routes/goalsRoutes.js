const express = require("express");
const router = express.Router();
const fs = require("fs");

const goalsController = require("../controllers/goalsControllers");

router.route("/goals").get(goalsController.getGoals);

router.route("/goals").post(goalsController.postGoals);

module.exports = router;
