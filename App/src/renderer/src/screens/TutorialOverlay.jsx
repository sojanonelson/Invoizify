import React, { useState } from "react";

const TutorialOverlay = ({ onClose }) => {
  const [step, setStep] = useState(0); // Track the current step (0 for welcome screen, 1 for tutorial)
  const [isTutorialActive, setIsTutorialActive] = useState(true); // Track if the tutorial is active

  // Define tutorial steps with specific positions and content
  const steps = [
    {
      title: "Welcome to the Dashboard!",
      message: "This is your Dashboard. You can manage all your activities here.",
      position: "top-center", // Position at the top center
    },
    {
      title: "Side Menu",
      message: "This is the side menu. From here, you can navigate to different sections like settings, profile, etc.",
      position: "bottom-left", // Position at the bottom left corner
    },
    {
      title: "Profile Settings",
      message: "Here is your profile. You can manage your account settings and other details.",
      position: "top-right", // Position at the top right corner
    },
    {
      title: "Notifications",
      message: "This is where you can check all your notifications and alerts.",
      position: "bottom-right", // Position at the bottom right corner
    },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1); // Move to the next step
    } else {
      onClose(); // Close the tutorial if the last step is reached
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Go back to the previous step
    }
  };

  const handleContinue = () => {
    setStep(1); // Start the tutorial from step 1
  };

  const handleSkip = () => {
    setIsTutorialActive(false); // Disable the tutorial
    onClose(); // Close the tutorial immediately
  };

  // Function to get the position class for each step
  const getPositionClass = (position) => {
    switch (position) {
      case "top-right":
        return "top-20 right-8";
      case "top-left":
        return "top-20 left-8";
      case "top-center":
        return "top-20 left-1/2 transform -translate-x-1/2";
      case "bottom-left":
        return "bottom-20 left-8";
      case "bottom-right":
        return "bottom-20 right-8";
      case "bottom-center":
        return "bottom-20 left-1/2 transform -translate-x-1/2";
      default:
        return "";
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
      {/* Display the Welcome Card if tutorial is active and step is 0 */}
      {step === 0 && isTutorialActive && (
        <div className="p-6 rounded-lg shadow-lg text-center bg-gray-800 text-white w-72">
          <h2 className="text-xl font-bold mb-4">Welcome to the App!</h2>
          <p className="mb-4">Let's take a quick tour of the app.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleContinue}
          >
            Continue Tutorial
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 ml-2"
            onClick={handleSkip}
          >
            Skip Tutorial
          </button>
        </div>
      )}

      {/* Render the current tutorial step */}
      {step > 0 && isTutorialActive && (
        <div
          className={`p-4 rounded-lg shadow-lg text-center bg-gray-800 text-white w-72 absolute ${getPositionClass(steps[step - 1].position)}`}
        >
          <h2 className="text-xl font-bold mb-4">{steps[step - 1].title}</h2>
          <p className="mb-4">{steps[step - 1].message}</p>

          {/* Back Button (only visible if it's not the first step) */}
          {step > 1 && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 mr-2"
              onClick={handleBack}
            >
              Back
            </button>
          )}

          {/* Next or Finish Button */}
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleNext}
          >
            {step === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialOverlay;
