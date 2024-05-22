const express = require("express");
const {
  getPosts,
  createScore,
  getAllScores,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getPosts);
router.post("/", createScore);
router.get("/allScores", getAllScores);

module.exports = router;
