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
    <div className="bg-gray-100 h-screen p-8 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-full mx-auto w-full h-full">
        <h1 className="text-3xl font-semibold mb-6 flex items-center justify-start">
          <FiFileText className="mr-2" /> Create Invoice
        </h1>

        {/* Client Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Client (To):</label>
          <div className="flex items-center mb-4">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="block w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
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
              className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
            >
              <FiPlus className="mr-2" /> Add New Client
            </button>
          </div>
          {showNewClientInput && (
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Enter new client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addNewClient}
                className="ml-4 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Invoice Date Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Invoice Date:</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Payment Terms Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Payment Terms:</label>
          <select
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            className="block w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="30 days">30 Days</option>
            <option value="60 days">60 Days</option>
            <option value="90 days">90 Days</option>
            <option value="Due on receipt">Due on receipt</option>
          </select>
        </div>

        {/* Notes Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Notes:</label>
          <textarea
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes here"
          />
        </div>

        {/* Product Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Product:</label>
          <div className="flex items-center">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="block w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
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
              className="ml-4 w-24 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Qty"
            />
            <button
              onClick={addProductToInvoice}
              className="ml-4 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
            >
              <FiCheckCircle className="mr-2" /> Add
            </button>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Invoice Items:</h2>
          {invoiceItems.length > 0 ? (
            <ul>
              {invoiceItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-4">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items added yet.</p>
          )}
        </div>

        {/* Extra Charges Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Extra Charges:</label>
          <input
            type="number"
            value={extraCharges}
            onChange={(e) => setExtraCharges(e.target.value)}
            className="w-1/3 p-3 border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Total Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium">Total: ₹{calculateTotal()}</h2>
        </div>

        {/* Create Invoice Button */}
        <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
