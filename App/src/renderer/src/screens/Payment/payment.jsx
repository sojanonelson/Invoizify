import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { useSpring, animated } from 'react-spring';

const Payment = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay is not loaded yet.");
      return;
    }

    const options = {
      key: "rzp_test_LMvbPjBxhpGAco", // Replace with your Razorpay API Key
      amount: 50000, // Amount in smallest currency unit (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Invoizify",
      description: "Test Transaction",
      image: Logo, // Optional: Your logo
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        console.log(response);
        setPaymentSuccessful(true); // Trigger animation
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
    razorpay.on("payment.failed", function (response) {
      alert("Payment Failed! Error: " + response.error.reason);
      console.error(response.error);
    });
    razorpay.open();
  };

  // Animation config
  const fadeIn = useSpring({
    opacity: paymentSuccessful ? 1 : 0,
    config: { duration: 500 }
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
      {!paymentSuccessful ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Subscription Cards here */} 
        </div>
      ) : (
        <animated.div style={fadeIn} className="bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Thank You!</h2>
          <p className="mt-4 text-gray-600">
            Your subscription has been successfully purchased. Enjoy the benefits!
          </p>
        </animated.div>
      )}
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        onClick={handlePayment}
        disabled={paymentSuccessful}
      >
        {paymentSuccessful ? 'Purchase Again' : 'Buy Now'}
      </button>
    </div>
  );
};

export default Payment;
