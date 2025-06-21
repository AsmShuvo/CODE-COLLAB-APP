const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    githubRepo: {
      type: String,
      default: "", // Default empty if the repo is not shared
    },
    repoVisibility: {
      type: Boolean,
      default: false, // false = private, true = public
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
