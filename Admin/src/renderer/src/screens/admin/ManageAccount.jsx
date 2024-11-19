import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaRegTrashAlt } from 'react-icons/fa'; // Icons
import { AiOutlineCalendar } from 'react-icons/ai'; // Calendar icon

const ManageAccount = () => {
  // Mock user account data
  const userAccounts = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Administrator',
      status: 'Active',
      joined: '2023-05-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'User',
      status: 'Inactive',
      joined: '2022-11-13',
    },
    {
      id: 3,
      name: 'Sam Green',
      email: 'samgreen@example.com',
      role: 'Manager',
      status: 'Active',
      joined: '2021-08-22',
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage User Accounts</h1>

      {/* User Accounts Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center">
                    <AiOutlineCalendar className="mr-2 text-gray-500" />
                    {user.joined}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    className="p-2 text-blue-600 hover:text-blue-800"
                    onClick={() => alert(`Editing user: ${user.name}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => alert(`Deleting user: ${user.name}`)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional sections or actions */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New User</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="User">User</option>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAccount;
