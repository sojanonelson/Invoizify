import React, { useState } from 'react';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { Spinner } from 'react-bootstrap'; // Assuming Bootstrap for spinner

const InvoicePreview = ({ invoiceImages, invoiceDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % invoiceImages.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + invoiceImages.length) % invoiceImages.length
    );
  };

  // Function to handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex w-full p-6 bg-gray-100 h-[80vh]">
      {/* Left Side: Invoice Image Slider */}
      <div className="w-3/5 p-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Conditional Rendering: Show loading spinner or image */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
              <Spinner animation="border" variant="white" />
            </div>
          )}
          <img
            src={invoiceImages[currentImageIndex]}
            alt="Invoice Image"
            className={`w-auto h-[75vh] object-cover rounded-md shadow-lg transition-all duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
          />
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 rounded-full p-2"
        >
          <MdArrowBack />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 rounded-full p-2"
        >
          <MdArrowForward />
        </button>
      </div>

      {/* Right Side: Invoice Details */}
      <div className="w-2/5 p-4">
        <h2 className="text-2xl font-bold mb-4">{invoiceDetails.templateName}</h2>
        <div className="mb-2">
          <strong>Designer: </strong>
          <span>{invoiceDetails.designer}</span>
        </div>
        <div className="mb-2">
          <strong>Purpose: </strong>
          <span>{invoiceDetails.purpose}</span>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Design Features:</h3>
          <ul className="list-disc pl-5">
            {invoiceDetails.designFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button className="bg-violet-600 text-white py-2 px-4 rounded-full hover:bg-violet-700 transition">
            Use this template
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
