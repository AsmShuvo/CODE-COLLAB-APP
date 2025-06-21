const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (userData) => {
  try {
    const hashedPass = await bcrypt.hash(userData.password, 10);
    const newUserData = { ...userData, password: hashedPass };
    const newUser = await User.create(newUserData);
    return {
      success: true,
      message: "User created successfully",
      user_id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      githubProfile: newUser.githubProfile,
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

// Function for login user
exports.loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Compare the password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // Return user data excluding the password field
    const { password: userPassword, ...userData } = user.toObject();
    return {
      success: true,
      message: "Login successful",
      user: userData,  // Return user details without the password
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Server Error",
      error: error.message,
    };
  }
};
