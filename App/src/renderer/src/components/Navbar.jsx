import React, { useState, useEffect ,forwardRef  } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUserFromLocalStorage } from "../services/localstorageService";
import { MdDashboard, MdSettings, MdHelp, MdLogout, MdNotifications } from "react-icons/md"; // Added Notification icon
import { FaBars } from "react-icons/fa"; // Menu icon
import { BsWifi, BsWifiOff } from "react-icons/bs"; // Network icons
import Logo from "../assets/logo.png"; // Logo path
import Profile from "../assets/profile.png";
// import { checkInternetConnection } from "../utils/networkConfirm"; // Your utility function
// import TutorialOverlay from "../screens/TutorialOverlay"; // Import the tutorial overlay component

const Navbar = ({ref, onMenuClick }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // For user dropdown
  const [showNotifications, setShowNotifications] = useState(false); // For notifications dropdown
  const [isOnline, setIsOnline] = useState(true); // For network status
  const [showTutorial, setShowTutorial] = useState(false); // State to trigger tutorial overlay
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Invoice #1234 has been approved." },
    { id: 2, message: "Reminder: Invoice #5678 is due tomorrow." },
    { id: 3, message: "System maintenance scheduled for Friday." },
  ]); // Example notifications

  const user = getUser();


  const handleLogout = () => {
    window.location.hash = "/admin/login";
    removeUserFromLocalStorage();
  };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const status = await checkInternetConnection();
  //     setIsOnline(status);
  //   }, 2000); // Refresh every 2 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <nav ref={ref} className="w-full select-none py-3 px-6 flex justify-between items-center bg-black border-gray-900 text-white border-b-2">
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
        <div className="relative">
          <MdNotifications
            className="text-2xl cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {notifications.length > 0 && (
            <span
              onClick={() => setShowNotifications(!showNotifications)}
              className="absolute select-none top-0 right-0 h-5 w-5 cursor-pointer bg-red-500 text-white text-[12px] flex items-center justify-center rounded-full"
            >
              {notifications.length}
            </span>
          )}

          {showNotifications && (
            <div className="absolute select-none right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">Notifications</h3>
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                        <MdDashboard className="text-lg" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <span className="text-xs text-gray-500">{new Date().toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
              )}
              <div className="text-center mt-3">
                <button
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => navigate("/notifications")}
                >
                  View All Notifications
                </button>
              </div>
            </div>
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
                <img
                  className="w-10 select-none rounded-full"
                  src={Profile}
                  alt="Profile"
                  onClick={() => setShowTutorial(true)} // Trigger tutorial when profile is clicked
                />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white shadow-lg rounded-lg">
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
        <FaBars className="text-2xl lg:hidden cursor-pointer" onClick={onMenuClick} />
      </div>

      {/* Tutorial Overlay Component */}
      {/* {< showTutorial && TutorialOverlay onClose={() => setShowTutorial(false)} />} */}
    </nav>
  );
};

export default Navbar;
