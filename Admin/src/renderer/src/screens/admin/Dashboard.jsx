import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaUserFriends, FaFileInvoiceDollar, FaChartPie } from 'react-icons/fa';

const Dashboard = () => {
  // Mock Data
  const userGrowthData = [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 300 },
    { month: 'Mar', users: 500 },
    { month: 'Apr', users: 700 },
    { month: 'May', users: 900 },
  ];

  const salesData = [
    { name: 'Product A', sales: 400 },
    { name: 'Product B', sales: 300 },
    { name: 'Product C', sales: 200 },
  ];

  const invoices = [
    { id: '#001', customer: 'John Doe', date: '2024-11-10', amount: '$120', status: 'Paid' },
    { id: '#002', customer: 'Jane Smith', date: '2024-11-12', amount: '$220', status: 'Pending' },
    { id: '#003', customer: 'Sam Wilson', date: '2024-11-14', amount: '$80', status: 'Overdue' },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your platform's activity and insights.</p>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 flex items-center">
          <FaUserFriends className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-bold">Total Users</h2>
            <p className="text-3xl font-bold">2,345</p>
            <p className="text-sm">+25% from last month</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6 flex items-center">
          <FaFileInvoiceDollar className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-bold">Monthly Revenue</h2>
            <p className="text-3xl font-bold">₹12,345</p>
            <p className="text-sm">+15% from last month</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-lg p-6 flex items-center">
          <FaChartPie className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-bold">New Invoices</h2>
            <p className="text-3xl font-bold">128</p>
            <p className="text-sm">+5% from last month</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <Bar dataKey="sales" fill="#82ca9d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
    

      {/* Invoice History */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Invoice History</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Customer</th>
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b">Amount</th>
              <th className="p-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="p-4 border-b">{invoice.id}</td>
                <td className="p-4 border-b">{invoice.customer}</td>
                <td className="p-4 border-b">{invoice.date}</td>
                <td className="p-4 border-b">{invoice.amount}</td>
                <td
                  className={`p-4 border-b ${
                    invoice.status === 'Paid'
                      ? 'text-green-500'
                      : invoice.status === 'Pending'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
