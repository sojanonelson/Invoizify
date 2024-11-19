import React from 'react';

const Support = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Support</h1>
      <div className="space-y-4">
        <p>
          For assistance, please contact our support team:
        </p>
        <ul>
          <li>Email: <a href="mailto:support@company.com" className="text-blue-500">support@company.com</a></li>
          <li>Phone: <span className="font-semibold">+1 800 123 4567</span></li>
        </ul>
        <h2 className="font-semibold text-lg">FAQs</h2>
        <div>
          <p className="font-bold">How do I reset my password?</p>
          <p>Go to Settings  Security and click on "Reset Password."</p>
        </div>
        <div>
          <p className="font-bold">How can I enable notifications?</p>
          <p>Toggle the "Notifications" option in the Settings page.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
