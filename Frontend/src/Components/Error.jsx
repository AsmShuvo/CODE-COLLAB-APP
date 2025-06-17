import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation back to the home page

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirects to the homepage
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
        
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <button
          onClick={handleGoHome}
          className="px-6 py-2 text-lg font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
