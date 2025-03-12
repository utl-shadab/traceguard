import React from "react";
import { motion } from "framer-motion";

const Stepper = ({ steps, currentStep, onStepChange }) => {
  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      onStepChange(stepIndex);
    }
  };

  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          {/* Step Container */}
          <div
            className={`relative flex items-center px-3  py-1 rounded-full border transition-all duration-300 cursor-pointer ${
              index === currentStep
                ? "border-blue-500 bg-blue-100 text-blue-600 font-semibold"
                : index < currentStep
                ? "border-blue-500 bg-white text-gray-700"
                : "border-gray-300 bg-gray-100 text-gray-400"
            }`}
            onClick={() => handleStepClick(index)}
          >
            {/* Step Number */}
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`w-5 h-5 flex text-xs items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${
                index === currentStep
                  ? "border-blue-500 text-blue-600"
                  : index < currentStep
                  ? "border-blue-500  bg-blue-500 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {index + 1}
            </motion.span>

            {/* Step Label */}
            <span className="ml-2 text-xs">{step}</span>
          </div>

          {/* Horizontal Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 ${
                index < currentStep ? "bg-blue-500" : "bg-black"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
