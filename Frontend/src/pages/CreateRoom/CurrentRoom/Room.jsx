import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomId } = useParams();  // Get roomId from the URL
  const [userData, setUserData] = useState(null);
  const meetingRef = useRef(null);  // Reference for the meeting container

  useEffect(() => {
    // Fetch user data from localStorage when the component mounts
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserData(data);  // Set user data if available
    }
  }, []);

  // Function to check device permissions
  const checkDevicePermissions = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // If permission is granted, resolve the promise
      console.log("Devices authorized", stream);
      return true;
    } catch (err) {
      // Handle permission error
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

    // Use the user's _id as roomId (userId as roomId in this case)
    const appID = 447319404;
    const serverSecret = "4bfc2577211a2dcb7f3d8f9bb2223de3";

    // Generate Zego token for the meeting
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId, // Room ID (same as user._id)
      roomId, // User ID (same as roomId)
      userData.username // Username for Zego
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Ensure meeting container exists
    if (meetingRef.current) {
      zp.joinRoom({
        container: meetingRef.current, // Attach the meeting UI to the container
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // Video conference mode
        },
      });
    }
  };

  // Trigger meeting when user data and roomId are available
  useEffect(() => {
    if (userData && roomId) {
      startMeeting();
    }
  }, [userData, roomId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0d1117] text-gray-200 py-10">
      <div className="bg-[#1a1f27] p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Room: {roomId}
        </h2>

        {/* Display the meeting container */}
        <div ref={meetingRef} className="w-full h-96 bg-gray-800 rounded-lg"></div>

        {/* Display a message if user data is missing */}
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
