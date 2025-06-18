import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="bg-gradient-to-b from-[#0d1117] via-[#0d1117] to-[#1a1f27] text-gray-200 min-h-screen flex justify-center py-12 items-center flex-col">
      {/* Tech Stack Section */}
      <div className="bg-gradient-to-r from-[#1a1f27] via-[#2c3038] to-[#1a1f27] p-8 rounded-xl shadow-lg w-full max-w-5xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-200">Select Your Technologies</h2>
        <div className="flex flex-wrap justify-start gap-6">
          {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java'].map((tech, index) => (
            <label key={index} className="flex items-center space-x-3 text-gray-200">
              <input type="checkbox" className="form-checkbox text-indigo-600 h-5 w-5" />
              <span className="text-lg">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Create Room Button Section */}
      <Link to={"/create-room"} className="mb-12">
        <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-800 focus:outline-none transition duration-300 transform hover:scale-105">
          Create Room
        </button>
      </Link>

      {/* Rooms Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl text-center text-gray-300 mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.length === 0 ? (
            <div className="text-center text-gray-500 text-xl col-span-full">
              No rooms available yet. Create a room above to get started.
            </div>
          ) : (
            rooms.map((room, index) => (
              <div key={index} className="bg-gradient-to-r from-[#2c3038] via-[#353b44] to-[#2c3038] p-6 rounded-lg shadow-xl transform transition duration-300 hover:bg-[#353b44] hover:scale-105">
                <h3 className="text-2xl font-semibold text-indigo-500">{room.roomName}</h3>
                <p className="text-sm text-gray-400 mt-3">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {room.tags.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Author: {room.author}</p>
                  <p>Max Participants: {room.maxParticipants}</p>
                </div>
                <div className="mt-4 flex space-x-4 justify-between">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
                    onClick={() => handleJoinRoom(room.roomName)}
                  >
                    Join Room
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700"
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

      {/* Your Rooms Section */}
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-3xl text-center text-gray-300 mb-6">Your Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myRooms.length === 0 ? (
            <div className="text-center text-gray-500 text-xl col-span-full">
              You don't have any rooms yet. Create one to get started.
            </div>
          ) : (
            myRooms.map((room, index) => (
              <div key={index} className="bg-gradient-to-r from-[#2c3038] via-[#353b44] to-[#2c3038] p-6 rounded-lg shadow-xl transform transition duration-300 hover:bg-[#353b44] hover:scale-105">
                <h3 className="text-2xl font-semibold text-indigo-500">{room.roomName}</h3>
                <p className="text-sm text-gray-400 mt-3">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {room.tags.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Author: {room.author}</p>
                  <p>Max Participants: {room.maxParticipants}</p>
                </div>
                <div className="mt-4 flex space-x-4 justify-between">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
                    onClick={() => handleJoinRoom(room.roomName)}
                  >
                    Join Room
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700"
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
