import React, { useState, useEffect } from "react";
import { Loader2, Search, PlusCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { createParty, getAllParty } from "../services/partyService";

const ManageParties = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [partiesPerPage, setPartiesPerPage] = useState(13);

  const [newParty, setNewParty] = useState({
    shopName: "",
    ownerName: "",
    gstNumber: "",
    fssaiCode: "",
    phone: "",
    email: "",
    drugLicence: "",
    partyType: "wholesaler",
    creditPeriod: 30,
    creditLimit: 50000,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateParty = async () => {
    try {
      const response = await createParty(newParty);
      if (response) {
        setIsCreateModalOpen(false);
        fetchParties(); // Refresh the list
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchParties = async () => {
    setLoading(true);
    try {
      const response = await getAllParty("6772af23fe13fcc845d1e3be");
      if (response) {
        setParties(response.data);
      } else {
        setParties([]);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const refreshHandler = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      await fetchParties();
      setIsRefreshing(false);
    }, 1000);
  };

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

  const filteredParties = parties.filter((party) => {
    const term = searchTerm.toLowerCase();
    const matchesTerm =
      party.shopName.toLowerCase().includes(term) ||
      party.partyType.toLowerCase().includes(term) ||
      party.gstNumber.toLowerCase().includes(term);

    const matchesType = filterType === "All" || party.partyType === filterType;

    return matchesTerm && matchesType;
  });

  const indexOfLastParty = currentPage * partiesPerPage;
  const indexOfFirstParty = indexOfLastParty - partiesPerPage;
  const currentParties = filteredParties.slice(indexOfFirstParty, indexOfLastParty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredParties.length / partiesPerPage);

  const Pagination = () => (
    <div className="flex justify-center  items-center space-x-4 mt-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );

  const CreatePartyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Party</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={newParty.shopName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={newParty.ownerName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={newParty.gstNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">FSSAI Code</label>
            <input
              type="text"
              name="fssaiCode"
              value={newParty.fssaiCode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={newParty.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newParty.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Drug Licence</label>
            <input
              type="text"
              name="drugLicence"
              value={newParty.drugLicence}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Party Type</label>
            <select
              name="partyType"
              value={newParty.partyType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Limit</label>
            <input
              type="number"
              name="creditLimit"
              value={newParty.creditLimit}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Period (Days)</label>
            <select
              name="creditPeriod"
              value={newParty.creditPeriod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={30}>30</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button 
            onClick={() => setIsCreateModalOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateParty}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Party
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none"
          />
          <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <PlusCircle className="mr-2 inline" /> Add Party
        </button>
      </div>

      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : currentParties.length === 0 ? (
        renderNoPartiesContent()
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Shop Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Owner
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Type
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        GST Number
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Contact
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Credit Limit
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {currentParties.map((party, index) => (
      <tr key={party._id || index} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {party.shopName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {party.ownerName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              party.partyType === "wholesaler"
                ? "bg-blue-100 text-blue-800"
                : party.partyType === "retailer"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {party.partyType}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {party.gstNumber}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {party.phone || "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ₹{party.creditLimit}
        </td>
      </tr>
    ))}
  </tbody>
</table>

          <Pagination />
        </>
      )}

      {isCreateModalOpen && <CreatePartyModal />}
    </div>
  );
};

export default ManageParties;
