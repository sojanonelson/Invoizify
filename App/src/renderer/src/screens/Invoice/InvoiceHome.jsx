import React, { useState } from 'react'
import { MdAdd, MdManageAccounts, MdMoreVert } from 'react-icons/md'
import InvoicePreview from './InvoicePreview'

const InvoiceHome = () => {
  const [userPlan] = useState('basic') // Assuming the user plan is fetched and stored here
  const [previewImage, setPreviewImage] = useState(null) // State to manage image preview
  const [isPreviewOpen, setIsPreviewOpen] = useState(false) // State to control the preview modal visibility
  const [searchTerm, setSearchTerm] = useState(''); 

  const navigateTo = (path) => {
    window.location.hash = path // Navigate using hash routing
  }

  const [menuOpen, setMenuOpen] = useState(null) // Track open menu ID

  const handleMenuToggle = (id) => {
    setMenuOpen(menuOpen === id ? null : id) // Toggle menu visibility
  }

  const handleMenuAction = (action, templateId) => {
    setMenuOpen(null) // Close the menu
    if (action === 'default') {
      console.log(`Set template ${templateId} as default`)
      // Add logic to set as default
    } else if (action === 'feedback') {
      console.log(`Provide feedback for template ${templateId}`)
      // Add feedback logic
    }
  }

  const invoiceImages = [
    'https://i.ibb.co/LnKNKc9/1.png',
    'https://i.ibb.co/L14rRxH/2.png',
    'https://i.ibb.co/7Y3G1vB/3.png',
  ];

  const invoiceDetails = {
    templateName: 'Classic Invoice Template',
    designer: 'Fosofts Solutions',
    purpose: 'To create professional invoices for business use, emphasizing simplicity and clarity.',
    dueDate: '2025-01-20',
    customerName: 'John Doe',
    totalAmount: '₹5000',
    designFeatures: [
      "Clean and minimalistic layout",
      "Easy-to-read format",
      "Customizable sections for client details, item descriptions, and payment terms",
      "Professional color scheme: Blue and White",
      "Mobile and desktop responsive design"
    ],
  };




  const invoiceTemplates = [
    {
      id: 1,
      name: 'Classic Template',
      preview: 'https://i.ibb.co/Nr7Lnfx/3f33af80-2f63-48a1-9854-77f9406c95b3.png',
      isLocked: false,
      rating: 4 // Star rating
    },
    {
      id: 2,
      name: 'Modern Template Lite',
      preview: 'https://masterbundles.com/wp-content/uploads/2024/08/xnv-k-533.jpg',
      isLocked: false, // Lock this template for basic plan
      rating: 5 // Star rating
    },
    {
      id: 3,
      name: 'Minimal Template',
      preview:
        'https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1709166520/catalog/1612857134958727168/nonymbeymocdcygiz9wg.webp',
      isLocked: userPlan === 'basic', // Lock this template for basic plan
      rating: 3 // Star rating
    },
    {
      id: 4,
      name: 'Modern Template Pro',
      preview:
        'https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1709166520/catalog/1612857134958727168/nonymbeymocdcygiz9wg.webp',
      isLocked: userPlan === 'basic', // Lock this template for basic plan
      rating: 5 // Star rating
    }
  ]

  const handlePreviewClick = (imageUrl) => {
    setPreviewImage(imageUrl) // Set the image to be previewed
    setIsPreviewOpen(true) // Open the preview modal
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false) // Close the preview modal
  }

  const filteredTemplates = invoiceTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const InvoiceTemplateCard = ({
    template,
    onPreviewClick,
    onMenuToggle,
    onMenuAction,
    menuOpen
  }) => (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={template.preview}
        alt={`${template.name} Preview`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-poppins-bold text-lg mb-2">{template.name}</h3>
        <div>
          {template.isLocked ? (
            <button
              className="border-2 bg-gray-700 text-gray-100 px-4 py-2 items-center rounded-md hover:bg-blue-600 mr-2"
              onClick={() => navigateTo('/user/subscription')}
            >
              👑Unlock template
            </button>
          ) : (
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => navigateTo(`/select-template/${template.id}`)}
            >
              Use Template
            </button>
          )}
           
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => onPreviewClick(template.preview)}
          >
            Preview
          </button>
          <div className="py-1 text-left">
            <span>Rating: </span>
            {'★'.repeat(template.rating)}
            {'☆'.repeat(5 - template.rating)}
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={() => onMenuToggle(template.id)}
      >
        <MdMoreVert size={24} />
      </button>
      {menuOpen === template.id && (
        <div className="absolute right-10 top-1 bg-white border rounded shadow-md z-20">
          <ul>
            <li>
              <button
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={() => onMenuAction('default', template.id)}
              >
                Set as Default Template
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={() => onMenuAction('feedback', template.id)}
              >
                Feedback
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )

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

      <div className="mb-4">
        <input
          type="text"
          className="w-2/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Templates Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Invoice Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <InvoiceTemplateCard
                key={template.id}
                template={template}
                onPreviewClick={handlePreviewClick}
                onMenuToggle={handleMenuToggle}
                onMenuAction={handleMenuAction}
                menuOpen={menuOpen}
              />
            ))
          ) : (
            <p className="text-gray-500">No templates found.</p>
          )}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-2/3 p-2 bg-white rounded-lg relative">
            <InvoicePreview invoiceImages={invoiceImages} invoiceDetails={invoiceDetails}  />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full"
              onClick={handleClosePreview}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceHome
