const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("CodeCollab Server is on...");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
