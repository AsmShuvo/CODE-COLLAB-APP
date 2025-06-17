import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (email and password required)
    if (!formData.email || !formData.password) {
      setError('Email and Password are required');
      return;
    }

    // If all validations pass, clear error message and show success alert
    setError('');

    // Show SweetAlert for successful login
    Swal.fire({
      title: 'Logged In!',
      text: 'You have logged in successfully!',
      icon: 'success',
      confirmButtonText: 'Go to Dashboard',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to Dashboard or Home page after login
        navigate('/dashboard');
      }
    });

    // You can log the form data or handle backend authentication here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-[#0d1117] text-gray-200 min-h-screen flex justify-center py-10 items-center flex-col">
      <div className="text-center">
        <img
          src="/images/logo.png"
          alt="App Logo"
          className="w-16 mb-5 mx-auto rounded-full"
        />
        <h2 className="text-2xl">Sign in to Your Account</h2>
      </div>
      <form
        className="bg-[#151B23] border border-gray-700 p-4 rounded-lg w-80 mt-5"
        onSubmit={handleSubmit}
      >
        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-600 p-1 bg-[#0d1117] text-gray-200 rounded-lg"
            // placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-600 p-1 bg-[#0d1117] text-gray-200 rounded-lg"
            // placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-lg"
        >
          Sign in
        </button>
        <div className="text-center mt-4 text-sm">
          <a href="#" className="text-blue-400">
            Forgot password?
          </a>
        </div>
      </form>
      <p className="mt-4 text-sm">
        <Link to={"/register"} className="text-blue-400">
          New to the app? Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
