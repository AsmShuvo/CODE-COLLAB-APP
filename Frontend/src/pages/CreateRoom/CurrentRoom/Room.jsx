import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Use useParams to get dynamic URL params

const Room = () => {
  const { roomId } = useParams();  // Get the roomId from the URL
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // Set user ID from localStorage if user data is found
      setUserId(userData._id);
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Room ID: {roomId}
        </h2>

        {/* Display user ID */}
        {userId ? (
          <div className="text-center text-gray-300">
            <p>User ID: {userId}</p>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            <p>No user logged in</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
