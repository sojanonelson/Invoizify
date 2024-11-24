import React, { useState } from 'react';
import {
  FaUsers,
  FaCog,
  FaHome,
  FaChartLine,
  FaBell,
  FaLifeRing,
  FaSignOutAlt,
  FaMoon,
  FaInfoCircle,
} from 'react-icons/fa';
import Navbar from '../components/Navbar'; // Assuming Navbar is in the components folder
import packageJson from '../../../../package.json';

const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const navigateTo = (path) => {
    window.location.hash = path;
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white overflow-auto shadow-md">
          {/* Logo / Banner */}
          <div className="p-6 text-center font-bold text-xl bg-gray-900 shadow-lg">
            <h1 className="text-2xl">Invoizify</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="mt-6">
              <li
                onClick={() => navigateTo('/admin/dashboard')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaHome className="inline mr-3 text-lg" /> Dashboard
              </li>
              <li
                onClick={() => navigateTo('/admin/account')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaUsers className="inline mr-3 text-lg" /> Manage Users
              </li>
              <li
                onClick={() => navigateTo('/admin/reports')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaChartLine className="inline mr-3 text-lg" /> Reports
              </li>
              <li
                onClick={() => navigateTo('/admin/notifications')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaBell className="inline mr-3 text-lg" /> Notifications
              </li>
              <li
                onClick={() => navigateTo('/admin/settings')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaCog className="inline mr-3 text-lg" /> Settings
              </li>
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-700 mx-6 my-4"></div>

            {/* Additional Options */}
            <ul>
              <li
                onClick={() => setDarkMode(!darkMode)}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaMoon className="inline mr-3 text-lg" /> {darkMode ? 'Light Mode' : 'Dark Mode'}
              </li>
              <li
                onClick={() => navigateTo('/admin/about')}
                className="px-6 py-3 hover:bg-gray-700 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaInfoCircle className="inline mr-3 text-lg" /> About App
              </li>
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-6 text-sm text-center text-gray-400">
            <p>Version {packageJson.version}</p>
            <button
              onClick={() => (window.location.hash = '/')}
              className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 overflow-auto ${darkMode ? 'bg-gray-700 text-white' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
