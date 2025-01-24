import React, { useState, useEffect, useMemo } from "react";
import { Loader2, Search, PlusCircle,RefreshCw  } from "lucide-react";
import { createParty, getAllParty } from "../services/partyService";

const ManageParties = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const [newParty, setNewParty] = useState({
    shopName: "ABAB",
    ownerName: "BABA",
    gstNumber: "ABSBS",
    fssaiCode: "ASA",
    phone: "85858585858",
    email: "jknwrjn@gmail.com",
    drugLicence: "renejrng43",
    partyType: "wholesaler",
    creditPeriod: 30,
    creditLimit: 50000
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  console.log("C:", newParty)

  const fetchParties = async () => {
    setLoading(true);
    try {
      const response = await getAllParty('6772af23fe13fcc845d1e3be');
      if (response) {
        setParties(response.data);
      } else {
        setParties([]);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
      setIsRefreshing(false); // Stop animation after refresh
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const refreshHandler = async () => {
    setIsRefreshing(true);
  
    // Set a timeout for at least 3 seconds
    setTimeout(async () => {
      await fetchParties(); // Call your data-fetching function
      setIsRefreshing(false);
    }, 3000); // 3 seconds delay
  };
  
  

  const handleCreateParty = async () => {
    try {
      const response = await createParty(newParty);
      if (response) {
        setIsCreateModalOpen(false);
        // Optionally refresh parties list
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Render content when no parties found
  const renderNoPartiesContent = () => (
    <div className="text-center py-10 bg-gray-800 rounded-lg">
      <h2 className="text-2xl text-gray-400 mb-4">No Parties Found</h2>
      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center mx-auto space-x-2"
      >
        <PlusCircle className="mr-2" /> Create First Party
      </button>
    </div>
  );

  // Create Party Modal
  const CreatePartyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 w-full max-w-2xl p-8 rounded-lg space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Create New Party</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={newParty.shopName}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={newParty.ownerName}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={newParty.gstNumber}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">FSSAI Code</label>
            <input
              type="text"
              name="fssaiCode"
              value={newParty.fssaiCode}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={newParty.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newParty.email}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Drug Licence</label>
            <input
              type="text"
              name="drugLicence"
              value={newParty.drugLicence}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Party Type</label>
            <select
              name="partyType"
              value={newParty.partyType}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Credit Limit</label>
            <input
              type="email"
              name="email"
              value={newParty.creditLimit}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Credit Period</label>
            
            <select
              name="partyType"
              value={newParty.creditPeriod}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            >
              <option value="">Select Period</option>
              <option value="retailer">1</option>
              <option value="wholesaler">2</option>
              <option value="supplier">3</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button 
            onClick={() => setIsCreateModalOpen(false)}
            className="bg-gray-700 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateParty}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Party
          </button>
        </div>
      </div>
    </div>
  );

  
  // Filtered parties based on search and filter type
  const filteredParties = parties.filter((party) => {
    const term = searchTerm.toLowerCase();
    const matchesTerm = 
      party.shopName.toLowerCase().includes(term) ||
      party.partyType.toLowerCase().includes(term) ||
      party.gstNumber.toLowerCase().includes(term);
    
    const matchesType = filterType === 'All' || party.partyType === filterType;
    
    return matchesTerm && matchesType;
  });

  // if (loading) return <div className="w-full min-h-screen px-2 bg-gray-900">Loading...</div>;
  if (error) return <div className="w-full min-h-screen px-2 bg-gray-900">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen px-2 bg-gray-900 text-white">
       <h1 className="text-4xl font-semibold">Manage Parties</h1>

<div className="mt-8 space-y-6">
  <div className="flex items-center justify-between  mb-10">
    <input
      type="text"
      placeholder="Search by Name, Role, GST..."
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
      <option value="wholesaler">Wholesaler</option>
      <option value="retailer">Retailer</option>
      <option value="supplier">Supplier</option>
    </select>
    <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Party
            </button>
            <button 
              onClick={refreshHandler}
              className={`flex items-center px-4 py-2 rounded transition-transform ${
                isRefreshing ? "animate-spin" : ""
              }`}
            >
              <RefreshCw className="text-white" />
            </button>
          </div>
  </div>

  <div className="space-y-2 lg:h-[80vh] overflow-y-auto">
  {parties.length === 0 && renderNoPartiesContent()}
      
      {isCreateModalOpen && <CreatePartyModal />}

    

    {filteredParties.map((party, index) => (
      <div 
        key={party._id || index} 
        className="flex items-center justify-between py-2 px-6 bg-gray-800 rounded-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="text-lg font-medium">{party.shopName}</div>
        </div>
        <div className="flex items-center space-x-4 overflow-hidden">
          <div>{party.role}</div>
          <div>{party.gstNumber}</div>
        </div>
      </div>
    ))}

  </div>
</div>
  
    </div>
  );
};

export default ManageParties;