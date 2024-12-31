import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { FiUsers, FiDollarSign, FiTrendingUp, FiFileText } from "react-icons/fi";

const Dashboard = () => {
  // Fake data for charts
  const salesData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1900 },
    { month: "Mar", sales: 3000 },
    { month: "Apr", sales: 2500 },
    { month: "May", sales: 3200 },
    { month: "Jun", sales: 2900 },
  ];

  const growthData = [
    { month: "Jan", growth: 10 },
    { month: "Feb", growth: 20 },
    { month: "Mar", growth: 30 },
    { month: "Apr", growth: 40 },
    { month: "May", growth: 25 },
    { month: "Jun", growth: 35 },
  ];

  const recentInvoices = [
    {
      id: "INV-001",
      client: "John Doe",
      date: "2024-11-01",
      amount: "₹12,000",
      status: "Paid",
    },
    {
      id: "INV-002",
      client: "Jane Smith",
      date: "2024-11-10",
      amount: "₹8,500",
      status: "Unpaid",
    },
    {
      id: "INV-003",
      client: "ABC Corp.",
      date: "2024-11-15",
      amount: "₹23,400",
      status: "Paid",
    },
    {
      id: "INV-004",
      client: "XYZ Pvt Ltd",
      date: "2024-11-20",
      amount: "₹18,200",
      status: "Unpaid",
    },
  ];

  return (
    <div className="w-full  bg-gray-100 p-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Export Data
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FiUsers size={24} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">Total Users</h2>
            <p className="text-2xl font-bold">1,240</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">Revenue</h2>
            <p className="text-2xl font-bold">₹4,56,000</p>
          </div>
        </div>

        {/* Growth */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">Growth</h2>
            <p className="text-2xl font-bold">+18%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white  rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Sales
          </h2>
          <BarChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4f46e5" />
          </BarChart>
        </div>

        {/* Growth Chart */}
        <div className="bg-white  rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Growth
          </h2>
          <LineChart width={500} height={300} data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="growth" stroke="#22c55e" />
          </LineChart>
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Recently Created Invoices
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Invoice ID</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="px-4 py-2">{invoice.id}</td>
                <td className="px-4 py-2">{invoice.client}</td>
                <td className="px-4 py-2">{invoice.date}</td>
                <td className="px-4 py-2">{invoice.amount}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    invoice.status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
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
