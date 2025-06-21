import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";
import axios from "axios"; // Import Axios for HTTP requests

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    tags: "",
    maxParticipants: 3,
    githubRepo: "", // GitHub repo field
    repoVisibility: "public", // Default visibility to public
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        roomName: `${userData.username}'s room`,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomName || !formData.description || !formData.tags) {
      setError("All fields are required!");
      return;
    }

    if (formData.maxParticipants <= 0) {
      setError("Max participants must be greater than 0");
      return;
    }

    setError(""); 

    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || !userData._id) {
      setError("User not logged in");
      return;
    }

    const roomData = {
      roomName: formData.roomName,
      description: formData.description,
      tags: formData.tags.split(","), // Convert comma-separated tags into an array
      maxParticipants: formData.maxParticipants,
      ownerId: userData._id, // Set the user as the room owner
      githubRepo: formData.repoVisibility === "public" ? formData.githubRepo : "", // If public, include GitHub repo; if private, don't include
      repoVisibility: formData.repoVisibility === "public", // Store as boolean (true for public, false for private)
    };

    try {
      const response = await axios.post("http://localhost:3000/room/create-room", roomData);

      if (response.data.success) {
        Swal.fire({
          title: "Room Created!",
          text: "Your room has been created successfully!",
          icon: "success",
          confirmButtonText: "Go to Room",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/room/${response.data.roomId}`);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Room Creation Failed",
          text: response.data.message || "An error occurred.",
        });
      }
    } catch (error) {
      console.error("Error creating room:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the room.",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Create a New Room
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Room Name</label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
              placeholder="Enter Room Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
              placeholder="Enter Room Description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
              placeholder="Enter tags (e.g., React, Node.js, JavaScript)"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
              placeholder="Max number of participants"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">GitHub Repository URL</label>
            <input
              type="text"
              name="githubRepo"
              value={formData.githubRepo}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
              placeholder="Enter GitHub Repository URL"
              required={formData.repoVisibility === "public"}
              disabled={formData.repoVisibility === "private"}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">Repository Visibility</label>
            <select
              name="repoVisibility"
              value={formData.repoVisibility}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2c3038] border border-gray-700 text-gray-200 rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 flex items-center justify-center gap-1 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Create Room <MdOutlineDone />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
