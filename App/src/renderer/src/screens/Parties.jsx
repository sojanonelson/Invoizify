import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaEllipsisV } from 'react-icons/fa'; // 3-dot icon

// Mock data for parties
const fakeParties = [
  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },  {
    shopName: 'Tech Solutions',
    ownerName: 'John Doe',
    gstNumber: 'GST123456',
    partyType: 'Wholesaler',
    creditPeriod: 30,
    creditLimit: 50000,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    shopName: 'Hardware Hub',
    ownerName: 'Mark Wilson',
    gstNumber: 'GST345678',
    partyType: 'Supplier',
    creditPeriod: 60,
    creditLimit: 100000,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    shopName: 'Grocery Mart',
    ownerName: 'Jane Smith',
    gstNumber: 'GST789012',
    partyType: 'Retailer',
    creditPeriod: 45,
    creditLimit: 30000,
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Add more mock data as needed
];

const ManageParties = ({ parties = fakeParties }) => {
  const [selectedParties, setSelectedParties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false); // Menu open state

  const handleSelect = (party) => {
    setSelectedParties(prevState => {
      if (prevState.includes(party)) {
        return prevState.filter(item => item !== party);
      } else {
        return [...prevState, party];
      }
    });
  };

  const handleDeleteAllSelected = () => {
    setSelectedParties([]);
  };

  const filteredParties = parties.filter(party => {
    const term = searchTerm.toLowerCase();
    return (
      party.shopName.toLowerCase().includes(term) ||
      party.ownerName.toLowerCase().includes(term) ||
      party.gstNumber.toLowerCase().includes(term)
    );
  });

  const filteredAndFilteredParties = filterType === 'All' 
    ? filteredParties 
    : filteredParties.filter(party => party.partyType === filterType);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const menuOptions = [
    { label: 'Manage Parties', action: () => console.log('Managing Parties') },
    { label: 'Export Data', action: () => console.log('Exporting Data') },
    { label: 'Other Options', action: () => console.log('Other Options') }
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gray-900 text-white px-10 py-8">
      <h1 className="text-4xl font-semibold ">Manage Parties</h1>

      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by Name, Owner, GST..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white w-2/5 px-4 py-2 rounded"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Retailer">Retailer</option>
            <option value="Supplier">Supplier</option>
          </select>
          <button
            onClick={handleMenuToggle}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaEllipsisV />
          </button>
        </div>

        {menuOpen && (
          <div className="bg-gray-800 p-4 rounded shadow-lg absolute top-50 z-20 right-10 w-48">
            {menuOptions.map(option => (
              <button
                key={option.label}
                onClick={option.action}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {selectedParties.length > 0 && (
          <button
            onClick={handleDeleteAllSelected}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
          >
            Delete Selected
          </button>
        )}

        {filteredAndFilteredParties.length > 0 ? (
          <div className='overflow-auto' style={{ maxHeight: '800px' }}>
            <table className="w-full table-auto border-collapse border border-gray-600 mt-4 relative">
              <thead>
                <tr className="select-none">
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedParties.length === filteredAndFilteredParties.length) {
                          setSelectedParties([]);
                        } else {
                          setSelectedParties(filteredAndFilteredParties);
                        }
                      }}
                      checked={selectedParties.length === filteredAndFilteredParties.length}
                    />
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Image</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Shop Name</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Owner Name</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">GST Number</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Party Type</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Credit Period</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Credit Limit</th>
                  <th className="border border-gray-600 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndFilteredParties.map((party, index) => (
                  <tr 
                    key={index} 
                    className={`cursor-pointer ${selectedParties.includes(party) ? 'bg-gray-300' : ''}`}
                  >
                    <td className="border border-gray-600 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedParties.includes(party)}
                        onChange={() => handleSelect(party)}
                      />
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      <img src={party.imageUrl} alt={party.shopName} className="select-none w-16 h-16 object-cover rounded-full" />
                    </td>
                    <td className="border border-gray-600 px-4 py-2">{party.shopName}</td>
                    <td className="border border-gray-600 px-4 py-2">{party.ownerName}</td>
                    <td className="border border-gray-600 px-4 py-2">{party.gstNumber}</td>
                    <td className="border border-gray-600 px-4 py-2">{party.partyType}</td>
                    <td className="border border-gray-600 px-4 py-2">{party.creditPeriod} days</td>
                    <td className="border border-gray-600 px-4 py-2">₹{party.creditLimit.toLocaleString()}</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      <button
                        onClick={() => handleSelect(party)}
                        className={`px-4 py-2 rounded ${selectedParties.includes(party) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {selectedParties.includes(party) ? 'Deselect' : 'Select'}
                      </button>
                      <button
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
                      >
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">No parties found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageParties;
