// src/layouts/UserLayout.jsx
import React from 'react';
import { FaHome, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const UserLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white">
        <div className="p-4 text-lg font-bold">User Panel</div>
        <nav>
          <ul>
            <li className="px-4 py-2 hover:bg-blue-700">
              <FaHome className="inline mr-2" /> Dashboard
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <FaShoppingCart className="inline mr-2" /> Orders
            </li>
            <li className="px-4 py-2 hover:bg-blue-700">
              <FaChartLine className="inline mr-2" /> Analytics
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4">{children}</main>
    </div>
  );
};

export default UserLayout;
