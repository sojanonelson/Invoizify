import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'Your account was accessed from a new device.', time: '2 hours ago' },
    { id: 2, message: 'Monthly sales report is available.', time: '1 day ago' },
    { id: 3, message: 'New user registered on your platform.', time: '3 days ago' },
  ];

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-2">
        {notifications.map((note) => (
          <li key={note.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="text-gray-800">{note.message}</p>
            <small className="text-gray-500">{note.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
