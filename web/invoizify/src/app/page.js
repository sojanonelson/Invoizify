"use client"
import React, { useState, useEffect } from 'react';
import { Download, FileText, Clock, DollarSign, BarChart2, Shield, Menu, X, Building, Users, Globe } from 'lucide-react';


const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <FileText className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Professional Invoices",
      description: "Create beautiful, customizable invoices in seconds with our intuitive interface"
    },
    {
      icon: <Clock className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Time-Saving Automation",
      description: "Automate recurring invoices and save hours of manual work each month"
    },
    {
      icon: <DollarSign className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Payment Tracking",
      description: "Keep track of paid and unpaid invoices with our comprehensive dashboard"
    },
    {
      icon: <BarChart2 className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Insightful Reports",
      description: "Generate detailed financial reports and analyze your business performance"
    },
    {
      icon: <Shield className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and regular backups"
    }
  ];

  const stats = [
    {
      icon: <Download className="w-8 h-8 text-blue-600" />,
      value: 50000,
      label: "Downloads"
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      value: 10000,
      label: "Business Users"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      value: 25,
      label: "Countries"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src='/assets/icon.png' alt='logo' className='w-10'></img>
              <div className="text-blue-600 text-xl font-bold">Invoizify</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">Support</a>
              <a href='https://sourceforge.net/projects/invoizify/files/latest/download'>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">Support</a>
                <a href='https://sourceforge.net/projects/invoizify/files/latest/download'>
                  <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 pt-32 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Professional Invoice Generation <br />Made Simple
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, manage, and track invoices effortlessly with our powerful desktop software.
          Save time and get paid faster.
        </p>
        <a href='https://sourceforge.net/projects/invoizify/files/latest/download'>
          <button className="bg-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
            <Download className="w-5 h-5" />
            Download for Windows
          </button>
        </a>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.label === "Countries" && "+"}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Trusted by Companies Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Replace these with actual company logos */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">Company 1</div>
            </div>
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">Company 2</div>
            </div>
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">Company 3</div>
            </div>
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">Company 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything You Need to Manage Invoices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Streamline Your Invoicing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust our software for their invoicing needs.
            Download now and experience the difference.
          </p>
          <a href='https://sourceforge.net/projects/invoizify/files/latest/download'>
            <button className="bg-white text-green-600 text-lg font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
              <Download className="w-5 h-5" />
              Download Free Trial
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">Invoizify</div>
            <p className="mb-6">© 2025 Invoizify. All rights reserved.</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;