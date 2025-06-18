const express = require("express");
import { router } from "./../../Frontend/src/Routes/router";
const {addUser} = require("../Controller/user.controller");
const rotuer = express.Router();

router.post("/", addUser);

module.exports = router;
