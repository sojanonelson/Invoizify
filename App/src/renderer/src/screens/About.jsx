import React from "react";
import { FiCheckCircle, FiUsers, FiClock, FiTrendingUp } from "react-icons/fi";

const About = () => {
  return (
    <div className="overflow-hidden" >
      <div className="max-h-screen bg-gray-50 p-6 overflow-auto "  style={{ maxHeight: '943px' }} >
      {/* Header Section */}
      <header className="bg-blue-500 text-white py-12 text-center shadow-lg">
        <h1 className="text-4xl font-bold">About Our Application</h1>
        <p className="mt-4 text-lg text-blue-100">
          Simplifying your business operations with cutting-edge solutions.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What is this App About?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our application is a comprehensive invoicing and billing platform
            tailored to meet the needs of small and medium-sized businesses. It
            allows users to create, manage, and track invoices with ease while
            offering advanced features such as client management, real-time
            payment tracking, and detailed analytics.
          </p>
        </section>

        {/* Key Features */}
        <section className="bg-gray-100 shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <FiCheckCircle className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-xl font-medium">Easy Invoice Creation</h3>
                <p className="text-gray-600">
                  Generate professional invoices in just a few clicks.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiUsers className="text-green-600 text-3xl" />
              <div>
                <h3 className="text-xl font-medium">Client Management</h3>
                <p className="text-gray-600">
                  Store and manage client details efficiently.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiClock className="text-yellow-600 text-3xl" />
              <div>
                <h3 className="text-xl font-medium">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Monitor payments and outstanding balances in real-time.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FiTrendingUp className="text-purple-600 text-3xl" />
              <div>
                <h3 className="text-xl font-medium">Advanced Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into your business performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to empower businesses by providing tools that
            simplify their operations and enable them to focus on what they do
            best. We are dedicated to innovation, customer satisfaction, and
            making business management a hassle-free experience.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-100 shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 text-lg">
            If you have any questions or feedback, feel free to reach out to
            us. We'd love to hear from you!
          </p>
          <div className="mt-4">
            <p className="text-gray-800 font-medium">
              Email: <span className="text-blue-600">support@yourapp.com</span>
            </p>
            <p className="text-gray-800 font-medium">
              Phone: <span className="text-blue-600">+1 (123) 456-7890</span>
            </p>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default About;
