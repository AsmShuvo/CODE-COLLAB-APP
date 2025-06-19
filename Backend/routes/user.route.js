const express = require("express");
const { addUser, signinUser} = require("../Controller/user.controller");
const router = express.Router();

router.post("/register", addUser);
router.post("/login", signinUser );

module.exports = router;
