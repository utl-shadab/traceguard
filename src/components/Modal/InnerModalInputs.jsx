import React, { useState } from "react";
import Stepper from "../ui/Stepper";

import CompanyDetails from "../companyMaster/CompanyDetails";
import SocialLinks from "../companyMaster/SocialLinks";
import WalletDetails from "../companyMaster/WalletDetails";

const InnerModalInputs = ({ formData, setFormData }) => {

  const steps = ["Company Details", "Social Links", "Wallet Details"];

  const [currentStep, setCurrentStep] = useState(0);

  // Render content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CompanyDetails formData={formData} setFormData={setFormData} />;
      case 1:
        return <SocialLinks />;
      case 2:
        return <WalletDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Stepper Component */}
      <div className="flex justify-center">
        <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {renderStepContent()}
      </div>

    </div>
  );
};

export default InnerModalInputs;
