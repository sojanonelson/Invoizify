import React, { useState } from 'react'

const Item = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    mrp: '',
    gst: '',
    hsn: '',
    manufacturer: '',
    stock: '',
    batch: '',
    manufactureDate: '',
    expiryDate: '',
    notes: ''
  })

  const [medicinesList, setMedicinesList] = useState([
    {
      name: 'Paracetamol',
      mrp: '50',
      gst: '12',
      hsn: '3004',
      manufacturer: 'ABC Pharma',
      stock: '100',
      batch: 'P123',
      manufactureDate: '2023-01-15',
      expiryDate: '2025-12-31',
      notes: 'For fever'
    },
    {
      name: 'Ibuprofen',
      mrp: '80',
      gst: '18',
      hsn: '3005',
      manufacturer: 'XYZ Pharma',
      stock: '50',
      batch: 'I456',
      manufactureDate: '2022-06-10',
      expiryDate: '2024-08-15',
      notes: 'For pain'
    }
  ])

  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicine({ ...medicine, [name]: value })
  }

  const handleSave = () => {
    if (!medicine.name || !medicine.mrp || !medicine.expiryDate || !medicine.manufactureDate) {
      alert('Please fill all required fields!')
      return
    }

    setMedicinesList([...medicinesList, medicine])
    alert('Medicine details saved successfully!')
    handleReset()
    setIsFormVisible(false)
  }

  const handleReset = () => {
    setMedicine({
      name: '',
      mrp: '',
      gst: '',
      hsn: '',
      manufacturer: '',
      stock: '',
      batch: '',
      manufactureDate: '',
      expiryDate: '',
      notes: ''
    })
  }

  const handleAddToCart = (medicine) => {
    setCart([...cart, medicine])
    alert(`${medicine.name} added to cart!`)
  }

  const filteredMedicines = medicinesList.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-h-screen bg-gray-100 flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Items Inventory</h2>

      <div className="justify-between w-full flex items-center">
        <div className="mb-6 w-2/5">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setIsFormVisible(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Item
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">MRP (₹)</th>
            <th className="px-4 py-2 border">GST (%)</th>
            <th className="px-4 py-2 border">HSN</th>
            <th className="px-4 py-2 border">Manufacturer</th>
            <th className="px-4 py-2 border">Stock</th>
            <th className="px-4 py-2 border">Batch</th>
            <th className="px-4 py-2 border">Manufacture Date</th>
            <th className="px-4 py-2 border">Expiry Date</th>
            <th className="px-4 py-2 border">Notes</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((med, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{med.name}</td>
              <td className="px-4 py-2 border">₹{med.mrp}</td>
              <td className="px-4 py-2 border">{med.gst}%</td>
              <td className="px-4 py-2 border">{med.hsn}</td>
              <td className="px-4 py-2 border">{med.manufacturer}</td>
              <td className="px-4 py-2 border">{med.stock}</td>
              <td className="px-4 py-2 border">{med.batch}</td>
              <td className="px-4 py-2 border">{med.manufactureDate}</td>
              <td className="px-4 py-2 border">{med.expiryDate}</td>
              <td className="px-4 py-2 border">{med.notes}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleAddToCart(med)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding New Medicine */}
      {isFormVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-11/12 max-w-lg p-6 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Add item details</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: 'Medicine Name *',
              name: 'name',
              type: 'text',
              placeholder: 'Enter medicine name'
            },
            { label: 'MRP (₹) *', name: 'mrp', type: 'number', placeholder: 'Enter MRP' },
            {
              label: 'GST (%)',
              name: 'gst',
              type: 'dropdown',
              options: [0, 5, 12, 18, 28] // Define GST percentage options
            },
            { label: 'HSN Code', name: 'hsn', type: 'text', placeholder: 'Enter HSN code' },
            {
              label: 'Manufacturer',
              name: 'manufacturer',
              type: 'text',
              placeholder: 'Enter manufacturer name'
            },
            {
              label: 'Stock',
              name: 'stock',
              type: 'number',
              placeholder: 'Enter stock quantity'
            },
            {
              label: 'Batch Number',
              name: 'batch',
              type: 'text',
              placeholder: 'Enter batch number'
            },
            {
              label: 'Manufacture Date *',
              name: 'manufactureDate',
              type: 'date',
              placeholder: 'Select manufacture date'
            },
            {
              label: 'Expiry Date *',
              name: 'expiryDate',
              type: 'date',
              placeholder: 'Select expiry date'
            },
            { label: 'Notes', name: 'notes', type: 'text', placeholder: 'Enter any notes' }
          ].map(({ label, name, type, placeholder, options }) => (
            <div className="select-none" key={name}>
              <label className="block font-medium">{label}</label>
              {type === 'dropdown' ? (
                <select
                  name={name}
                  value={medicine[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select GST percentage</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}%
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={medicine[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Medicine
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  )
}

export default Item
