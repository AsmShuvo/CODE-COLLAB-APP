const { createRoom } = require("../services/room.services");

const addRoom = async (req, res) => {
  try {
    const { roomName, description, tags, maxParticipants, ownerId, githubRepo, repoVisibility } = req.body;

    // Prepare room data to be stored in the database
    const roomData = {
      roomName,
      description,
      tags,
      maxParticipants,
      ownerId,
      githubRepo,
      repoVisibility,
    };

    const room = await createRoom(roomData);

    if (room.success) {
      return res.status(200).json({
        success: true,
        roomId: room.roomId,
        message: room.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: room.message,
        error: room.error,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating room",
      error: error.message,
    });
  }
};

module.exports = { addRoom };
