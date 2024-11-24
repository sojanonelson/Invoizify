import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getName, getUser, removeUserFromLocalStorage } from "../services/localstorageService";
import { MdDashboard, MdSettings, MdHelp, MdLogout, MdNotifications } from "react-icons/md"; // Added Notification icon
import { FaBars } from "react-icons/fa"; // Menu icon
import { BsWifi, BsWifiOff } from "react-icons/bs"; // Network icons
import Logo from "../assets/logo.png"; // Logo path
import { checkInternetConnection } from "../utils/networkConfirm"; // Your utility function
import Profile from '../assets/profile.png'
const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // For dropdown menu
  const [isOnline, setIsOnline] = useState(true); // For network status
  const [notifications, setNotifications] = useState(5); // Example notification count
  const user = getUser();
  const name = getName(); // Get user name from localStorage

  const handleLogout = () => {
    window.location.hash = "/admin/login";
    removeUserFromLocalStorage();
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await checkInternetConnection();
      setIsOnline(status);
    }, 2000); // Refresh every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`w-full py-3 px-6 flex justify-between items-center bg-white border-b-2`}
    >
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold">Invoizify</span>
      </div>

      {/* Network Status */}
      <div className="flex items-center space-x-6">
        <div className="flex select-none items-center space-x-2 bg-slate-100 rounded-xl p-1 px-2">
          {isOnline ? (
            <BsWifi className="text-green-600 text-lg" />
          ) : (
            <BsWifiOff className="text-red-600 text-lg" />
          )}
          <span className={`font-medium ${isOnline ? "text-green-600" : "text-red-600"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <MdNotifications className="text-2xl cursor-pointer" />
          {notifications > 0 && (
            <span
              className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
            >
              {notifications}
            </span>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4 relative">
          {user ? (
            <>
              <button
                className="text-lg font-medium focus:outline-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img className="w-10 rounded-full" src={Profile} alt="Profile"/>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className="absolute right-0 top-full mt-3 w-48 bg-white shadow-lg rounded-lg"
                >
                  <ul className="py-2 bg-gray-200 text-gray-700 rounded-lg">
                    <li>
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <MdDashboard className="mr-2" /> Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/user/settings")}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <MdSettings className="mr-2" /> Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/help")}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <MdHelp className="mr-2" /> Help
                      </button>
                    </li>
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
              onClick={() => navigate("/login")}
              className="text-blue-600 border border-blue-300 px-4 py-1 rounded-lg hover:bg-blue-100"
            >
              Login
            </button>
          )}
        </div>

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
