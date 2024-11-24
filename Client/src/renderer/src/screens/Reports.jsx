import React from 'react';

const Reports = () => {
  const mockData = [
    { id: 1, title: 'Sales Report', date: '2024-11-01', status: 'Completed' },
    { id: 2, title: 'User Activity Report', date: '2024-11-10', status: 'Pending' },
    { id: 3, title: 'Monthly Revenue', date: '2024-11-15', status: 'Completed' },
  ];

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Reports</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((report) => (
            <tr key={report.id}>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.date}</td>
              <td className="border px-4 py-2">
                <span
                  className={`py-1 px-2 rounded ${
                    report.status === 'Completed' ? 'bg-green-200' : 'bg-yellow-200'
                  }`}
                >
                  {report.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
