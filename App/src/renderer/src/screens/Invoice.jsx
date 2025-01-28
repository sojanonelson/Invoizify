import React, { useState } from "react";
import { FiPlus, FiCheckCircle, FiFileText } from "react-icons/fi";

const Invoice = () => {
  const [clients, setClients] = useState(["John Doe", "Jane Smith", "Robert Brown"]);
  const [products, setProducts] = useState([
    { name: "Product A", price: 50 },
    { name: "Product B", price: 75 },
    { name: "Product C", price: 100 },
  ]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [extraCharges, setExtraCharges] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [newClientName, setNewClientName] = useState("");
  const [showNewClientInput, setShowNewClientInput] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentTerms, setPaymentTerms] = useState("30 days");
  const [notes, setNotes] = useState("");

  const calculateTotal = () => {
    const productTotal = invoiceItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return productTotal + Number(extraCharges);
  };

  const addNewClient = () => {
    if (newClientName) {
      setClients([...clients, newClientName]);
      setSelectedClient(newClientName);
      setNewClientName("");
      setShowNewClientInput(false);
    }
  };

  const addProductToInvoice = () => {
    if (selectedProduct) {
      const product = products.find((p) => p.name === selectedProduct);
      setInvoiceItems([...invoiceItems, { ...product, quantity }]);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <div className=" h-[100vh]  w-full bg-white flex  justify-center pd-10  ">
      <div className="bg-white w-full overflow-y-scroll   p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <FiFileText className="mr-3 text-blue-600" /> Create Invoice
          </h1>
        </div>

        {/* Client Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Client:</label>
          <div className="flex items-center w-2/4 gap-2  mt-2">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select Client --</option>
              {clients.map((client, index) => (
                <option key={index} value={client}>
                  {client}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowNewClientInput(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center"
            >
              <FiPlus className="mr-2" /> Add New
            </button>
          </div>
          {showNewClientInput && (
            <div className="mt-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter new client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="flex-1 p-3 border rounded-lg w-2/4 gap-2  shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addNewClient}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Add Client
              </button>
            </div>
          )}
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Invoice Date:</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Payment Terms:</label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="30 days">30 Days</option>
              <option value="60 days">60 Days</option>
              <option value="90 days">90 Days</option>
              <option value="Due on receipt">Due on receipt</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Products:</label>
          <div className="flex items-center w-2/4 gap-2   mt-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 p-3 border w-2/4 gap-2  rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select Product --</option>
              {products.map((product, index) => (
                <option key={index} value={product.name}>
                  {product.name} - ₹{product.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-24 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addProductToInvoice}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center"
            >
              <FiCheckCircle className="mr-2" /> Add
            </button>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Invoice Summary:</h2>
          <div className="bg-gray-50 p-4 mt-4 rounded-lg shadow">
            {invoiceItems.length > 0 ? (
              invoiceItems.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-none">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items added yet.</p>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <label className="block text-lg font-medium text-gray-700">Extra Charges:</label>
            <input
              type="number"
              value={extraCharges}
              onChange={(e) => setExtraCharges(e.target.value)}
              className="p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 mt-2"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Total: ₹{calculateTotal()}</h2>
          </div>
         
        </div>
        <div className="flex justify-center mb-10">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700">
            Generate Invoice
          </button>
        </div>
      

      
      </div>
    </div>
  );
};

export default Invoice;
