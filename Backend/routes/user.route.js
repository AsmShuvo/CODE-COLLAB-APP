const express = require("express");
const { addUser } = require("../Controller/user.controller");
const router = express.Router();

router.post("/", addUser);

module.exports = router;
