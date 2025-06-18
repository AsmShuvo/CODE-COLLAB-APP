const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const salt = 10;

exports.createUser = async (userData) => {
  try {
    const hashedPass = await bcrypt.hash(userData.password, salt);
    const newUserData = { ...userData, password: hashedPass };
    const newUser = await User.create(newUserData);
    return {
      success: true,
      message: "User created successfully",
      user_id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
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
