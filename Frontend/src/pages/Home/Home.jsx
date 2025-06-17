import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch rooms data from public/rooms.json
    axios
      .get('/rooms.json')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        setError('Error fetching room data');
        console.error('Error fetching room data:', error);
      });

    // Fetch myrooms data from public/myrooms.json
    axios
      .get('/myrooms.json')
      .then((response) => {
        setMyRooms(response.data);
      })
      .catch((error) => {
        setError('Error fetching your rooms data');
        console.error('Error fetching your rooms data:', error);
      });
  }, []);

  // Handle Join Room
  const handleJoinRoom = (roomName) => {
    alert(`Joining room: ${roomName}`);
  };

  // Handle Delete Room
  const handleDeleteRoom = (roomName) => {
    alert(`Deleting room: ${roomName}`);
  };

  return (
    <div className="bg-[#0d1117] text-gray-200 min-h-screen flex justify-center py-10 items-center flex-col">
      {/* Tech Stack Section */}
      <div className="bg-[#1a1f27] p-6 rounded-lg shadow-xl w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">Select Your Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java'].map((tech, index) => (
            <label key={index} className="flex items-center space-x-2 text-gray-200">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span>{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Create Room Button Section */}
      <div className="mt-8">
        <button className="bg-indigo-600 text-white py-3 px-6 rounded-md shadow-xl hover:bg-indigo-700 focus:outline-none transition duration-300">
          Create Room
        </button>
      </div>

      {/* Rooms Section */}
      <div className="mt-8 p-6 bg-[#1b1f27] rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl text-center text-gray-300 mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length === 0 ? (
            <div className="text-center text-gray-500">
              No rooms available yet. Create a room above to get started.
            </div>
          ) : (
            rooms.map((room, index) => (
              <div
                key={index}
                className="bg-[#2c3038] p-4 rounded-lg shadow-lg hover:bg-[#353b44] transition duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-500">{room.roomName}</h3>
                <p className="text-sm text-gray-400 mt-2">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.tags.map((tag, index) => (
                    <span key={index} className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  <p>Author: {room.author}</p>
                  <p>Max Participants: {room.maxParticipants}</p>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-blue-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-700"
                    onClick={() => handleJoinRoom(room.roomName)}
                  >
                    Join Room
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Your Rooms Section */}
      <div className="mt-8 p-6 bg-[#1b1f27] rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl text-center text-gray-300 mb-6">Your Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRooms.length === 0 ? (
            <div className="text-center text-gray-500">
              You don't have any rooms yet. Create one to get started.
            </div>
          ) : (
            myRooms.map((room, index) => (
              <div
                key={index}
                className="bg-[#2c3038] p-4 rounded-lg shadow-lg hover:bg-[#353b44] transition duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-500">{room.roomName}</h3>
                <p className="text-sm text-gray-400 mt-2">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.tags.map((tag, index) => (
                    <span key={index} className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  <p>Author: {room.author}</p>
                  <p>Max Participants: {room.maxParticipants}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-blue-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-blue-700"
                    onClick={() => handleJoinRoom(room.roomName)}
                  >
                    Join Room
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-red-700"
                    onClick={() => handleDeleteRoom(room.roomName)}
                  >
                    Delete Room
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
