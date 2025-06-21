const Room = require("../models/roomModel");

exports.createRoom = async (roomData) => {
  try {
    // Check if the user already has a room
    const existingRoom = await Room.findOne({ ownerId: roomData.ownerId });
    
    if (existingRoom) {
      return {
        success: false,
        message: "You already have a room.",
      };
    }

    // Create a new room if the user doesn't have one
    const newRoom = await Room.create(roomData);
    return {
      success: true,
      message: "Room created successfully",
      roomId: newRoom._id,
    };
  } catch (error) {
    console.log("Error creating room:", error);
    return {
      success: false,
      message: "Error creating room",
      error: error.message,
    };
  }
};
