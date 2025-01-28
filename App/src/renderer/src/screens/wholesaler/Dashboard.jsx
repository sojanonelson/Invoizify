import React, { useState } from "react";
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
import { 
  FileSpreadsheet,
  BarChart3,
  Download,
  ChevronDown,
  FileDown
} from "lucide-react";

const Dashboard = ({ theme }) => {
  const [monthRange, setMonthRange] = useState({ start: "Jan", end: "Jun" });
  const [showExportMenu, setShowExportMenu] = useState(false);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Extended sales data with revenue
  const allSalesData = [
    { month: "Jan", sales: 1200, revenue: 150000 },
    { month: "Feb", sales: 1900, revenue: 180000 },
    { month: "Mar", sales: 3000, revenue: 250000 },
    { month: "Apr", sales: 2500, revenue: 200000 },
    { month: "May", sales: 3200, revenue: 280000 },
    { month: "Jun", sales: 2900, revenue: 240000 },
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
      id: "INV-004",
      client: "XYZ Pvt Ltd",
      date: "2024-11-20",
      amount: "₹18,200",
      status: "Unpaid",
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
  ];

  // Filter data based on month range
  const filteredSalesData = allSalesData.filter(
    (item) =>
      months.indexOf(item.month) >= months.indexOf(monthRange.start) &&
      months.indexOf(item.month) <= months.indexOf(monthRange.end)
  );

  const ExportMenu = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
      <div className="py-1">
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <FileSpreadsheet size={16} />
          Export to Excel
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <BarChart3 size={16} />
          Export to Power BI
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <FileDown size={16} />
          Export as CSV
        </button>
      </div>
    </div>
  );

  return (
    <div className={`w-full h-[100vh] overflow-y-scroll bg-gray-50 p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <Download size={16} />
            Export Data
            <ChevronDown size={16} />
          </button>
          {showExportMenu && <ExportMenu />}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800">1,240</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <BarChart3 size={24} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">₹4,56,000</p>
            <p className="text-sm text-gray-500">+8% from last month</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <Download size={24} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Growth</h2>
            <p className="text-2xl font-bold text-gray-800">+18%</p>
            <p className="text-sm text-gray-500">+2% from last month</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Month</label>
            <select
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={monthRange.start}
              onChange={(e) => setMonthRange({ ...monthRange, start: e.target.value })}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Month</label>
            <select
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={monthRange.end}
              onChange={(e) => setMonthRange({ ...monthRange, end: e.target.value })}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <BarChart width={500} height={300} data={filteredSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4f46e5" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          <BarChart width={500} height={300} data={filteredSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#22c55e" />
          </BarChart>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y select-none  divide-gray-200">
              {recentInvoices.map((invoice) => (
                <tr className="cursor-pointer hover:bg-gray-50 " key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;