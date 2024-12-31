import React, { useEffect, useRef, useState } from 'react';
import {
  FaHome,
  FaFileInvoice,
  FaBell,
  FaLifeRing,
  FaCog,

  FaSignOutAlt,
  FaInfoCircle,
 
  FaPlus,
  FaPersonBooth
} from 'react-icons/fa';
import Navbar from '../components/Navbar'; // Assuming Navbar exists
import packageJson from '../../../../package.json';

import TutorialOverlay from '../screens/TutorialOverlay';

const UserLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);


  const navigateTo = (path) => {
    window.location.hash = path;
  };

   
  useEffect(() => {
   

    
    if (!localStorage.getItem('tutorialSeen')) {
      setShowTutorial(true); 
    }
  }, []);


  const handleCloseTutorial = () => {
    localStorage.setItem('tutorialSeen', 'true');
    setShowTutorial(false);
  };

  const handleLogout = () => {
    // Ask for confirmation before logging out
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    
    if (isConfirmed) {
      // If the user confirms, log out by redirecting to home
      window.location.hash = '/';
    }
    // If user cancels, do nothing
  };



  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navbar */}
      <Navbar />

      {showTutorial && <TutorialOverlay onClose={handleCloseTutorial} />}
      <div className="flex flex-1 overflow-hidden">
      
        {/* Sidebar */}
        <aside className="w-64 flex flex-col bg-gray-800 text-white overflow-auto shadow-md">
          {/* Logo / Banner */}

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="mt-3">
              <li
                onClick={() => navigateTo('/user/invoice/create')}
                className="my-4 py-3 mx-3 bg-blue-800 text-white font-bold rounded-lg text-center hover:bg-blue-700 hover:text-white cursor-pointer transition-all duration-200"
              >
                <FaPlus className="inline mr-3 text-lg rotate-90" />Create invoice
              </li>
              <li
                onClick={() => navigateTo('/user/parties')}
                className="px-6 py-3 mx-1   rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaPersonBooth className="inline mr-3 text-lg" /> Parties
              </li>

              <li
                onClick={() => navigateTo('/user/subscription')}
                className="px-6 py-3 mx-1   rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaHome className="inline mr-3 text-lg" /> Plan
              </li>
              <li
                onClick={() => navigateTo('/user/dashboard')}
                className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaHome className="inline mr-3 text-lg" /> Dashboard
              </li>
              <li
                onClick={() => navigateTo('/user/item')}
                className="px-6 py-3 mx-1  rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaLifeRing className="inline mr-3 text-lg" /> Items
              </li>
              <li
                onClick={() => navigateTo('/user/invoice')}
                className="px-6 py-3 mx-1  rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaFileInvoice className="inline mr-3 text-lg" /> Invoices
              </li>
              <li
                onClick={() => navigateTo('/user/notifications')}
                className="px-6 py-3 mx-1  rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaBell className="inline mr-3 text-lg" /> Notifications
              </li>
              <li
                onClick={() => navigateTo('/user/support')}
                className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaLifeRing className="inline mr-3 text-lg" /> Support
              </li>
              <li
                onClick={() => navigateTo('/user/settings')}
                className="px-6 py-3 mx-1  rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaCog className="inline mr-3 text-lg " /> Settings
              </li>
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-700 mx-6 my-4"></div>

            
            <ul>
              <li
                onClick={() => navigateTo('/user/about')}
                className="px-6 py-3 mx-1  rounded-md flex items-center cursor-pointer transition-all duration-200"
              >
                <FaInfoCircle className="inline mr-3 text-lg" /> About App
              </li>
            </ul>

          </nav>

          {/* Footer Section */}
          <div className="p-6 text-sm text-center text-gray-400">
            <p>Version {packageJson.version}</p>
            <button
              onClick={handleLogout} // Use the handleLogout function here
              className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </aside>

      
<main
  
  className={`flex-1 p-0  ${
    darkMode ? 'bg-gray-700 text-white' : ''
  }`}
>
  {children}
</main>

      </div>
    </div>
  );
};

export default UserLayout;
