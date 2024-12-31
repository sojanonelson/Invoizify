import React, { useState } from "react";

const Welcome = ({ onDismiss }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const handleStart = () => {
    setShowTutorial(true);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Welcome Content */}
      {!showTutorial && (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Invoizify!</h1>
          <p className="text-gray-600 mt-4">
            We're excited to have you on board. Invoizify is here to simplify your invoicing process.
          </p>
          <button
            onClick={handleStart}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Tutorial
          </button>
          <button
            onClick={onDismiss}
            className="mt-2 text-sm text-gray-500 hover:underline"
          >
            Skip
          </button>
        </div>
      )}

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <div className="max-w-xl bg-gray-800 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold">How to Use Invoizify</h2>
            <ul className="mt-4 text-left list-disc list-inside space-y-2">
              <li>Navigate to the Dashboard to view all your invoices.</li>
              <li>Use the "Create Invoice" button to generate a new invoice.</li>
              <li>Access Settings to customize your preferences.</li>
              <li>Check Notifications for updates.</li>
            </ul>
            <button
              onClick={onDismiss}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
