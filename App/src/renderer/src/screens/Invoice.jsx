import React, { useState } from "react";
import { FiPlus, FiCheckCircle, FiFileText, FiCalendar } from "react-icons/fi";

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

  // User's plan state (basic plan for this example)
  const [userPlan, setUserPlan] = useState("basic"); // Change to "premium" for upgraded users

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

  const calculateTotal = () => {
    const productTotal = invoiceItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return productTotal + Number(extraCharges);
  };

  return (
    <div className="bg-gray-100 h-screen p-10 overflow-y-auto flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <FiFileText className="mr-3 text-blue-600" /> Create Invoice
          </h1>
        </div>

        {/* Client Section */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Client:</label>
          <div className="flex items-center gap-4">
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
              className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
            >
              <FiPlus /> Add New
            </button>
          </div>
          {showNewClientInput && (
            <div className="mt-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter new client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="flex-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addNewClient}
                className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Add Client
              </button>
            </div>
          )}
        </div>

        {/* Date and Payment Terms */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Invoice Date:</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Payment Terms:</label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="30 days">30 Days</option>
              <option value="60 days">60 Days</option>
              <option value="90 days">90 Days</option>
              <option value="Due on receipt">Due on receipt</option>
            </select>
          </div>
        </div>

        {/* Product Section */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Products:</label>
          <div className="flex items-center gap-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              disabled={userPlan === "basic"} // Disable for basic plan
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
              placeholder="Qty"
              disabled={userPlan === "basic"} // Disable for basic plan
            />
            <button
              onClick={addProductToInvoice}
              className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
              disabled={userPlan === "basic"} // Disable for basic plan
            >
              <FiCheckCircle /> Add
            </button>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice Items:</h2>
          {invoiceItems.length > 0 ? (
            <ul className="bg-gray-50 p-4 rounded-lg shadow">
              {invoiceItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-none"
                >
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items added yet.</p>
          )}
        </div>

        {/* Extra Charges and Total */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Extra Charges:</label>
            <input
              type="number"
              value={extraCharges}
              onChange={(e) => setExtraCharges(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              disabled={userPlan === "basic"} // Disable for basic plan
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total:</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">₹{calculateTotal()}</p>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Notes:</label>
          <textarea
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter any additional notes"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700">
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
