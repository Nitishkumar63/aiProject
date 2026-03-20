const express = require("express");
const { askAI, saveChat } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask-ai", askAI);
router.post("/save", saveChat);

module.exports = router;