import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomId } = useParams(); // Get the roomId from the URL
  const [userData, setUserData] = useState(null);
  const meetingRef = useRef(null); // Reference to the meeting container

  useEffect(() => {
    // Get user data from localStorage
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserData(data); // Set user data if available
    }
  }, []);

  // Check device permissions before starting the meeting
  const checkDevicePermissions = async () => {
    try {
      // Request access to media devices
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

    // App credentials for ZegoCloud (replace with your actual credentials)
    const appID = 447319404;
    const serverSecret = "4bfc2577211a2dcb7f3d8f9bb2223de3";

    // Generate the Zego token for the meeting
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId, // Room ID is unique for the meeting (same for all users)
      Date.now().toString(), // User-specific ID (you can also use userId here)
      userData.username // User's username
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

  useEffect(() => {
    if (userData && roomId) {
      startMeeting();
    }
  }, [userData, roomId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-2 rounded-lg shadow-xl w-full h-96===">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Room: {roomId}
        </h2>

        {/* Display the meeting container */}
        <div
          ref={meetingRef}
          className="w-full h-[80vh] bg-gray-800 rounded-lg" // Ensure it takes full height, 70% of viewport height
        ></div>

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
