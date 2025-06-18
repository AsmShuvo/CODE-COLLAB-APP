import React, { useState } from "react";

const CreateRoom = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    tags: "",
    maxParticipants: 3,
  });

  // State to handle error messages
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate and handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.roomName || !formData.description || !formData.tags) {
      setError("All fields are required!");
      return;
    }

    if (formData.maxParticipants <= 0) {
      setError("Max participants must be greater than 0");
      return;
    }

    setError(""); // Clear error

    // Submit the form (this could be a function to add the room to the database)
    console.log("Room Created:", formData);
    // You can redirect or reset the form here
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
