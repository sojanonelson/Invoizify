import React from 'react';

import { MdAdd, MdManageAccounts } from 'react-icons/md';

const InvoiceHome = () => {
  

  const navigateTo = (path) => {
    window.location.hash = path; // Navigate using hash routing
  };

  const invoiceTemplates = [
    {
      id: 1,
      name: 'Classic Template',
      preview: 'https://via.placeholder.com/150?text=Template+1',
    },
    {
      id: 2,
      name: 'Modern Template',
      preview: 'https://via.placeholder.com/150?text=Template+2',
    },
    {
      id: 3,
      name: 'Minimal Template',
      preview: 'https://via.placeholder.com/150?text=Template+3',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 max-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => navigateTo('/user/invoice/create')}
          >
            <MdAdd className="mr-2 text-xl" />
            Create Invoice
          </button>
          <button
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            onClick={() => navigateTo('/manage-invoices')}
          >
            <MdManageAccounts className="mr-2 text-xl" />
            Manage Invoices
          </button>
        </div>
      </div>

      {/* Templates Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Invoice Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoiceTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={template.preview}
                alt={`${template.name} Preview`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => navigateTo(`/select-template/${template.id}`)}
                >
                  Select Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHome;
