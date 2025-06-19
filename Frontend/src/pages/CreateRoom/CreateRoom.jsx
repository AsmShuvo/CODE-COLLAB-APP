import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    tags: "",
    maxParticipants: 3,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.roomName || !formData.description || !formData.tags) {
      setError("All fields are required!");
      return;
    }

    if (formData.maxParticipants <= 0) {
      setError("Max participants must be greater than 0");
      return;
    }

    setError(""); // Clear error

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || !userData._id) {
      setError("User not logged in");
      return;
    }

    const roomId = userData._id; // Use the user's ID as the room ID

    // Save room data to localStorage (optional, if you want to persist it)
    localStorage.setItem("roomId", roomId);

    // Show SweetAlert for success
    Swal.fire({
      title: "Room Created!",
      text: "Your room has been created successfully!",
      icon: "success",
      confirmButtonText: "Go to Room",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to the newly created room with the roomId
        navigate(`/room/${roomId}`);
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Create a New Room
        </h2>

        {/* Display error messages */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Room Name */}
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

          {/* Description */}
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

          {/* Tags */}
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

          {/* Max Participants */}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
