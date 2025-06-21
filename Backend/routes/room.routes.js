const express = require("express");
const { addRoom } = require("../Controller/room.controller");

const router = express.Router();

router.post("/create-room", addRoom);

module.exports = router;
