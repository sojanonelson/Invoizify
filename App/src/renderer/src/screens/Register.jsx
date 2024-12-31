import React, { useState } from "react";
import invoice from '../assets/invoice.png'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { registerUser } from "../services/authService";
import TermsAndConditions from '../assets/document/term&condition'
import feedback from '../assets/1.png'


const Register = () => {
  const [preview, setPreview] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const [activeSlide, setActiveSlide] = useState(0); // State for slideshow
  const slides = [
    {
      title: "Easy Registration",
      description: "Register your business seamlessly with our user-friendly interface.",
      image: feedback,
    },
    {
      title: "Customizable Invoices",
      description: "Create professional invoices tailored to your business needs.",
      image: invoice,
    },
    {
      title: "Secure Data Management",
      description: "Your data is encrypted and stored securely on our platform.",
      image: invoice,
    },
  ];
  const [formData, setFormData] = useState({
    name: "sojan",
    email: "sojanana6awea@gmail.com",
    phone: "7902248895",
    shopName: "shopp",
    gstNumber: "232323232322424",
    fssaiCode: "323f23242",
    drugLicenceNumber: "13131333",
    role: "wholesaler",
    profilePicture: "frfrfrgrgrg",
    password: "sojansojan",
    confirmPassword: "sojansojan",
  });

  const steps = [
    "Personal Information",
    "Business Information",
    "Account Type",
    "Profile Picture",
    "Set Password",
    "Terms and Conditions",
  ];

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

    // Change slides automatically
    React.useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [slides.length]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, profilePicture: file.path }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear password error when typing
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await registerUser(formData);
      console.log('Registration Successful:', response);
  
      // Check if the status code is 200
      if (response.role ) {
        setIsRegistered(true);
      } 
  
    } catch (error) {
      console.error('Registration Failed:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
  
  
  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h1>
          <p className="text-gray-600 flex items-center">
            <MdEmail className="mr-2 text-indigo-600" /> 
            Please check your email <strong>{formData.email}</strong> and verify your account.
          </p>
          <button
            onClick={()=> window.location.hash = '/login'}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  


  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        );

        case 2:
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Business Information
      </h2>
      <div>
        <label className="block text-sm font-medium">Shop Name</label>
        <input
          type="text"
          name="shopName"
          value={formData.shopName}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">GST Number</label>
        <input
          type="text"
          name="gstNumber"
          placeholder="Enter the 15-character GST number"
          value={formData.gstNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          FSSAI Code <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="text"
          name="fssaiCode"
          placeholder="Enter FSSAI Code if applicable"
          value={formData.fssaiCode}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave blank if not applicable.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium">Drug License Number</label>
        <input
          type="text"
          name="drugLicenceNumber"
          placeholder="Enter the 10-digit Drug License number"
          value={formData.drugLicenceNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );

        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Account Type
            </h2>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option className="" value="wholesaler">Wholesaler</option>
                <option className="" value="retailer">Retailer</option>
                
              </select>
            </div>
          </div>
        );
        case 4:
          return (
            <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Profile Picture</h2>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full mt-4 border border-gray-300"
              />
            )}
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-400 bg-white border-blue-500 border-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
            >
              Choose File
              
              <input
                id="fileInput"
                type="file"
                onChange={handleFile}
                className="hidden"
              />
            </label>
            
            <p className="text-sm text-gray-600 mt-2">
              This image will be printed on the invoice. Please ensure it meets the required format and quality standards.
            </p>
          </div>
          
          );
        
          case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Set Password</h2>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-2 text-gray-600"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <em>Password must include at least one special character, one uppercase letter, and one number.</em>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute  top-3 right-2 text-gray-600 "
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
          </div>
        );
        case 6:
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Terms and Conditions</h2>
              <div  className='overflow-auto' style={{ maxHeight: '400px' }} >
              <TermsAndConditions />
                
                
            </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  By creating an account, you agree to our <a href="/terms" className="text-indigo-600">Terms and Conditions</a>.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    value={formData.acceptTerms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-800">I accept the terms and conditions</label>
                </div>
              </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-row items-center bg-gray-50">
      {/* Top navigation */}
      <div className="absolute top-4 left-4">
        <button
          className="flex items-center text-indigo-600"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </button>
      </div>

      <div className="justify-center  items-center flex  lg:w-2/5 lg:px-32 md:px-10   ">
      <div className="p-8 items-center h-85 w-full select-none">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cursor-pointer text-center w-12 h-12 flex items-center justify-center rounded-full ${
                activeStep === index + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleStepClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>
            )}
            {activeStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white"
              >
                Next
              </button>
            ) : (
              <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-green-600'} rounded-lg text-white`}
            >
              {isLoading ? 'Loading...' : 'Create account'}
            </button>
            )}
          </div>
        </form>
      </div>

      </div>
    
     
      <div className="h-screen w-3/5 bg-indigo-950 text-white flex items-center justify-center relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-8 text-center">
          <div>
            <img
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              className="w-96 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{slides[activeSlide].title}</h2>
            <p>{slides[activeSlide].description}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
