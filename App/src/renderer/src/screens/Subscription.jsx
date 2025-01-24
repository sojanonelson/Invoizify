import React from "react";

const Subscription = () => {
  const handlePayment = (amount) => {
    const options = {
      key: "rzp_test_LMvbPjBxhpGAco", // Replace with your Razorpay API key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Subscription Payment",
      description: "Thank you for subscribing!",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Logic to save payment details in the database
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Custom Tick Icons
  const BlueTick = () => (
    <span className="text-blue-500 font-bold text-lg">✔</span>
  );
  const GrayTick = () => (
    <span className="text-gray-500 font-bold text-lg">✔</span>
  );

  return (
    <div className="max-h-screen flex flex-col items-start justify-start py-10 bg-gray-100  text-gray-900 lg:px-10">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full  lg:px-32 pt-10">
        {/* Free Plan */}
        <div className="bg-white text-gray-800 shadow-lg rounded-lg flex flex-col p-6 h-auto">
          <h3 className="text-3xl font-semibold text-blue-500 mb-2">Free</h3>
          <p className="text-2xl font-bold">₹0/month</p>
          <p className="text-sm text-gray-500 mb-4">(10% Platform Fee)</p>
          <ul className="space-y-2 text-left flex-grow">
            <li><BlueTick /> 1 Admin</li>
            <li><BlueTick /> Store Products</li>
            <li><BlueTick /> Basic Invoice Generation</li>
            <li><BlueTick /> Customer Management</li>
            <li><BlueTick /> Unlimited Members</li>
            <li><BlueTick /> Manage Payments</li>
          </ul>
          <button
            onClick={() => alert("This plan is free!")}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 self-start"
          >
            Buy Now
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-800 text-white shadow-lg rounded-lg flex flex-col p-6 h-auto ">
          <h3 className="text-3xl font-semibold text-purple-400 mb-2">Pro</h3>
          <p className="text-xl text-gray-400 line-through">₹7,500/month</p>
          <p className="text-2xl font-bold">₹6,000/month</p>
          <p className="text-sm text-gray-400 mb-4">(0% Platform Fee)</p>
          <ul className="space-y-2 text-left flex-grow">
            <li><GrayTick /> 1 Admin (₹2,000/month additional)</li>
            <li><GrayTick /> Store Products</li>
            <li><GrayTick /> Advanced Invoice Generation</li>
            <li><GrayTick /> Recurring Billing & Subscriptions</li>
            <li><GrayTick /> Unlimited Invoice Generation</li>
            <li><GrayTick /> Customer Analytics</li>
            <li><GrayTick /> Priority Support</li>
          </ul>
          <button
            onClick={() => handlePayment(6000)}
            className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 self-start"
          >
            Buy Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white text-gray-800 shadow-lg rounded-lg flex flex-col p-6 h-auto">
          <h3 className="text-3xl font-semibold text-indigo-500 mb-2">Enterprise</h3>
          <p className="text-xl text-gray-500 line-through">₹50,000/month</p>
          <p className="text-2xl font-bold">₹40,000/month</p>
          <p className="text-sm text-gray-500 mb-4">(0% Platform Fee)</p>
          <ul className="space-y-2 text-left flex-grow">
            <li><GrayTick /> 10 Admins (₹2,000/month additional)</li>
            <li><GrayTick /> Store Products</li>
            <li><GrayTick /> Comprehensive ERP Integration</li>
            <li><GrayTick /> Unlimited Invoice Generation</li>
            <li><GrayTick /> Comprehensive Reporting Tools</li>
            <li><GrayTick /> Custom Branding Options</li>
            <li><GrayTick /> Dedicated Account Manager</li>
          </ul>
          <button
            onClick={() => handlePayment(40000)}
            className=" bg-indigo-500 text-white py-2 mt-32 px-6 rounded-lg hover:bg-indigo-600 self-start"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
