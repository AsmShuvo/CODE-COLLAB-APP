import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-blue-900 text-white shadow-md sticky top-0 z-10">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-800 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          {/* Logo */}
          <a className="btn btn-ghost text-3xl font-semibold">CodeCollab</a>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-2 space-x-6">
            <li>
              <a className="hover:text-blue-300">Home</a>
            </li>
            <li>
              <a className="hover:text-blue-300">About</a>
            </li>
            <li>
              <a className="hover:text-blue-300">Contact</a>
            </li>
            <li>
              <a className="hover:text-blue-300">Services</a>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-blue-700 transition duration-300"
            >
              <div className="w-12 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-800 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-secondary">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
