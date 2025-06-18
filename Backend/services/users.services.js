const User = require("../models/userModel");

exports.createUser = async (userData) => {
  try {
    const result = await User.create(userData);
    return {
      success: true,
      message: "User created successfully",
      user: newUser,
    };
  } catch (error) {
    console.log("Error creating user: ", error);
    return {
      success: false,
      message: "Error creating user",
      error: error.message,
    };
  }
};
