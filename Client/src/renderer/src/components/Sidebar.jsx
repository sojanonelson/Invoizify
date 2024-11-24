import React from 'react';

const Sidebar = () => {
  const menuItems = ['Dashboard', 'Analytics', 'Reports', 'Settings'];

  return (
    <div className="bg-gray-600 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item} className="py-2 px-4 hover:bg-gray-700 rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
