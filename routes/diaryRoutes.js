const express = require("express");
const router = express.Router();
const fs = require("fs");

const diaryController = require("../controllers/diaryController");

router
  .route("/meals")
  .get(diaryController.getMacros)
  .delete(diaryController.deleteMacro);

router.route("/").post(diaryController.postMacros);

module.exports = router;
