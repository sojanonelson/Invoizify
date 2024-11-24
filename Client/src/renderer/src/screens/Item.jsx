import React, { useState } from "react";

const Item = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    mrp: "",
    gst: "",
    hsn: "",
    manufacturer: "",
    stock: "",
    batch: "",
    expiry: "",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleImageUpload = (e) => {
    setMedicine({ ...medicine, image: e.target.files[0] });
  };

  const handleSave = () => {
    // Logic to save the medicine details
    console.log("Medicine Details:", medicine);
    alert("Medicine details saved successfully!");
  };

  const handleReset = () => {
    setMedicine({
      name: "",
      mrp: "",
      gst: "",
      hsn: "",
      manufacturer: "",
      stock: "",
      batch: "",
      expiry: "",
      notes: "",
      image: null,
    });
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col p-0">
     

      {/* Form Section */}
      <div className="flex flex-row h-full mt-1">
        {/* Left Panel */}
        <div className="w-2/3 bg-white shadow-lg rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Medicine Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium">Medicine Name</label>
              <input
                type="text"
                name="name"
                value={medicine.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter medicine name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">MRP (₹)</label>
                <input
                  type="number"
                  name="mrp"
                  value={medicine.mrp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter MRP"
                />
              </div>
              <div>
                <label className="block font-medium">GST (%)</label>
                <select
                  name="gst"
                  value={medicine.gst}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select GST</option>
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium">HSN Code</label>
              <input
                type="number"
                name="hsn"
                value={medicine.hsn}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter HSN code"
              />
            </div>
            <div>
              <label className="block font-medium">Manufacturer Name</label>
              <input
                type="text"
                name="manufacturer"
                value={medicine.manufacturer}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter manufacturer name"
              />
            </div>
            <div>
              <label className="block font-medium">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={medicine.stock}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter stock quantity"
              />
            </div>
            <div>
              <label className="block font-medium">Batch Number</label>
              <input
                type="text"
                name="batch"
                value={medicine.batch}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter batch number"
              />
            </div>
            <div>
              <label className="block font-medium">Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={medicine.expiry}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Additional Notes</label>
              <textarea
                name="notes"
                value={medicine.notes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter additional notes"
              ></textarea>
            </div>
            <div>
              <label className="block font-medium">Add Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
        </div>

        {/* Right Panel */}
        <div className="w-1/3 bg-gray-200 shadow-lg rounded p-6 ml-4">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="space-y-2">
            <p>
              <strong>Medicine Name:</strong> {medicine.name || "N/A"}
            </p>
            <p>
              <strong>MRP:</strong> ₹{medicine.mrp || "0"}
            </p>
            <p>
              <strong>GST:</strong> {medicine.gst || "0"}%
            </p>
            <p>
              <strong>HSN Code:</strong> {medicine.hsn || "N/A"}
            </p>
            <p>
              <strong>Manufacturer:</strong> {medicine.manufacturer || "N/A"}
            </p>
            <p>
              <strong>Stock:</strong> {medicine.stock || "0"}
            </p>
            <p>
              <strong>Batch:</strong> {medicine.batch || "N/A"}
            </p>
            <p>
              <strong>Expiry:</strong> {medicine.expiry || "N/A"}
            </p>
            <p>
              <strong>Notes:</strong> {medicine.notes || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 px-4 py-2 rounded text-white"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Save Medicine
        </button>
      </div>
    </div>
  );
};

export default Item;
