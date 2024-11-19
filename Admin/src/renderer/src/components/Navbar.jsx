// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getName, getUser, removeUserFromLocalStorage } from '../services/localstorageService';
// import { useSelector } from 'react-redux';
import { MdDashboard, MdSettings, MdHelp, MdLogout } from 'react-icons/md'; // Importing icons
import { FaBars } from 'react-icons/fa'; // Menu icon
import Logo from '../assets/logo.png'; // Logo path

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // For dropdown menu
//   const isDarkMode = useSelector((state) => state.theme.isDarkMode); // For theme toggle
const isDarkMode= useState(false)
  const user = getUser();
  const name = getName(); // Get user name from localStorage

  const handleLogout = () => {
    window.location.hash = '/admin/login'
    removeUserFromLocalStorage();
    
    
  };

  return (
    <nav
      className={`w-full py-3 px-6 flex justify-between items-center ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      } border-b-2 border-gray-700`}
    >
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">Invoizify</span>
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-4 relative">
        {user ? (
          <>
            <button
              className="text-lg font-medium focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.role === 'admin' ? 'Admin' : name || 'User'}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg  ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
              >
                <ul className="py-2 bg-gray-200 text-gray-700 rounded-lg ">
                  {/* Dashboard */}
                  <li>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <MdDashboard className="mr-2" /> Dashboard
                    </button>
                  </li>

                  {/* Settings */}
                  <li>
                    <button
                      onClick={() => navigate('/dashboard/settings')}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <MdSettings className="mr-2" /> Settings
                    </button>
                  </li>

                  {/* Help */}
                  <li>
                    <button
                      onClick={() => navigate('/help')}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <MdHelp className="mr-2" /> Help
                    </button>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      <MdLogout className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 border border-blue-300 px-4 py-1 rounded-lg hover:bg-blue-100"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Icon */}
        <FaBars
          className="text-2xl lg:hidden cursor-pointer"
          onClick={onMenuClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
