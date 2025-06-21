import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";

const Room = () => {
  const { roomId } = useParams();
  const [userData, setUserData] = useState(null);
  const meetingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserData(data);
    }
  }, []);

  // Check device permissions before starting the meeting
  const checkDevicePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Devices authorized", stream);
      return true;
    } catch (err) {
      console.error("Error accessing devices:", err);
      alert("Please grant access to your camera and microphone.");
      return false;
    }
  };

  // Function to start the meeting using ZegoCloud
  const startMeeting = async () => {
    if (!userData || !userData.username) {
      console.error("User data or username is missing");
      return;
    }

    const isPermissionGranted = await checkDevicePermissions();

    if (!isPermissionGranted) {
      return; // Don't proceed if permission is not granted
    }

    const appID = 447319404;
    const serverSecret = "4bfc2577211a2dcb7f3d8f9bb2223de3";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId, 
      Date.now().toString(), 
      userData.username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (meetingRef.current) {
      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
  };

  // Function to end the meeting and delete the room from the database
  const endMeeting = async () => {
    try {
      // Call the backend API to delete the room (you can change the URL as needed)
      const response = await axios.delete(`http://localhost:3000/room/delete-room/${roomId}`);
      
      if (response.data.success) {
        console.log("Meeting ended and room deleted from database");
        navigate("/"); // Redirect to the homepage or another page
      } else {
        console.log("Failed to delete the room:", response.data.message);
      }
    } catch (error) {
      console.error("Error ending the meeting:", error);
    }
  };

  useEffect(() => {
    if (userData && roomId) {
      startMeeting();
    }
  }, [userData, roomId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-2 rounded-lg shadow-xl w-full h-96">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Room: {roomId}
        </h2>

        <div
          ref={meetingRef}
          className="w-full h-[80vh] bg-gray-800 rounded-lg"
        ></div>

        {/* Button to end the meeting */}
        <div className="text-center mt-6">
          <button
            onClick={endMeeting}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            End Meeting
          </button>
        </div>

        {/* Show a message if user data is missing */}
        {!userData && (
          <div className="text-center text-red-500 mt-4">
            <p>User data is missing or invalid. Please login first.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
