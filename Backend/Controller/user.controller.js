const { createUser } = require("../services/users.services");

const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "failed to add user",
      error: error.message,
    });
  }
};

module.exports = { addUser };
