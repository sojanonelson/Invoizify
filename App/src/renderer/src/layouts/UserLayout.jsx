import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
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
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      window.location.hash = '/';
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />
      
      {showTutorial && <TutorialOverlay onClose={handleCloseTutorial} />}

      <div className="flex flex-1">
        {/* Sidebar with fixed/sticky position */}
        <aside className="w-64 h-screen sticky top-0 left-0 bg-gray-800 text-white shadow-md">
        <nav className="flex-1">
  <ul className="mt-3">
    <li onClick={() => navigateTo('/user/invoice/create')} className="my-4 py-3 mx-3 bg-blue-800 text-white items-center justify-center flex font-bold rounded-lg text-center hover:bg-blue-700 cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">add</span>  Create Invoice
    </li>
    <li onClick={() => navigateTo('/user/dashboard')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">dashboard</span> Dashboard
    </li>
    <li onClick={() => navigateTo('/user/parties')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">group</span> Parties
    </li>
    <li onClick={() => navigateTo('/user/subscription')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">home</span> Plan
    </li>
    <li onClick={() => navigateTo('/user/item')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">inventory</span> Items
    </li>
    <li onClick={() => navigateTo('/user/invoice')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">receipt</span> Invoices
    </li>
    <li onClick={() => navigateTo('/user/notifications')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">notifications</span> Notifications <div className="px-2 ml-2 rounded-full bg-red-500">3</div>
    </li>
    {/* <li onClick={() => navigateTo('/user/support')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">support</span> Support
    </li> */}
    <li onClick={() => navigateTo('/user/settings')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">settings</span> Settings
    </li>
  </ul>
  <div className="border-t border-gray-700 mx-6 my-4"></div>
  <ul>
    <li onClick={() => navigateTo('/user/about')} className="px-6 py-3 mx-1 rounded-md flex items-center cursor-pointer transition-all duration-200">
      <span className="material-icons mr-3">info</span> About App
    </li>
  </ul>
</nav>

          <div className="p-6 text-sm text-center text-gray-400">
            <p>Version {packageJson.version}</p>
            <button onClick={handleLogout} className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center">
              <span className="material-icons mr-2">logout</span> Logout
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <main className={`flex-1 overflow-x-hidden p-0 ${darkMode ? 'bg-gray-700 text-white' : ''}`}>{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
