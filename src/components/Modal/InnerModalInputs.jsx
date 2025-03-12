import React, { useState } from "react";
import Stepper from "../ui/Stepper";
import InputField from "../ui/InputField";
import Dropdown from "../ui/Dropdown";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";
import Checkbox from "../ui/Checkbox";
import Dropzone from "../ui/Dropzone";
import {
  LucideBuilding2,
  LucideDiamondPercent,
  LucideLayoutTemplate,
  LucidePhone,
  LucideMail,
} from "lucide-react";

const InnerModalInputs = () => {
  const steps = ["Company Details", "Social Links", "Wallet Details"];
  const options = ["Scratch", "QR Code"];
  const optionsRedemption = ["Paytm", "Loyalty Points"];
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = () => {
    console.log("File uploaded successfully!");
    setUploadedFile("File uploaded!"); 
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    companyDisplayName: "",
    prefix: "",
    email: "",
    phone: "",
    websiteUrl: "",
    smsMobile: "",
    whatsappMobile: "",
    loyaltyThrough: options[0],
    redemptionType: [],
    active: false,
    services: {
      scmService: false,
      warrantyService: false,
      smsAuthentication: false,
      whatsappService: false,
      pdfGeneration: false,
      loyalty: false,
      
    },
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }));
  };

  // Handle Apply from MultiSelect
  const handleApply = (selected) => {
    setFormData((prev) => ({
      ...prev,
      redemptionType: selected,
    }));
  };

  return (
    <div className="p-4">
      {/* Stepper Component */}
      <div className="flex justify-center">
      <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6">
        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Company Name<span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            icon={LucideBuilding2}
          />
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Company Display Name<span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            name="companyDisplayName"
            placeholder="Company Display Name"
            value={formData.companyDisplayName}
            onChange={handleChange}
            icon={LucideBuilding2}
          />
        </div>

        {/* Prefix */}
        <div>
          <label className="font-medium">
            Prefix<span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            name="prefix"
            placeholder="Prefix"
            value={formData.prefix}
            onChange={handleChange}
            icon={LucideDiamondPercent}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">
            Email<span className="text-red-500">*</span>
          </label>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            icon={LucideMail}
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="font-medium">
            Mobile<span className="text-red-500">*</span>
          </label>
          <InputField
            type="tel"
            name="phone"
            placeholder="Phone No."
            value={formData.phone}
            onChange={handleChange}
            icon={LucidePhone}
          />
        </div>

        {/* Website URL */}
        <div>
          <label className="font-medium">Website URL</label>
          <InputField
            type="text"
            name="websiteUrl"
            placeholder="Website URL"
            value={formData.websiteUrl}
            onChange={handleChange}
            icon={LucideLayoutTemplate}
          />
        </div>

        {/* Loyalty Through */}
        <div onMouseDown={(e) => e.preventDefault()}>
          <label className="font-medium">Loyalty Through</label>
          <Dropdown options={options} selectedOption={formData.loyaltyThrough} onSelect={(value) => setFormData({ ...formData, loyaltyThrough: value })} />
        </div>

        {/* Redemption Type */}
        <div onMouseDown={(e) => e.preventDefault()}>
          <label className="font-medium">Redemption Type</label>
          <MultiSelectDropdown options={optionsRedemption} onApply={handleApply} onCreateNew={() => alert("Create new space")} />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.active} onChange={() => setFormData({ ...formData, active: !formData.active })} color="blue" />
          <span className="text-gray-700 font-medium">Active</span>
        </div>

        {/* Services Checkboxes */}
        {Object.keys(formData.services).map((service, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox checked={formData.services[service]} onChange={() => handleCheckboxChange(service)} color="blue" />
            <label className="font-medium">{service.replace(/([A-Z])/g, " $1")}</label>
          </div>
        ))}

        {/* Conditionally Displayed Inputs */}
        {formData.services.whatsappService && (
          <div>
            <label className="block text-gray-700 font-medium">
              WhatsApp Mobile<span className="text-red-500">*</span>
            </label>
            <InputField
              type="tel"
              name="whatsappMobile"
              placeholder="Mobile No"
              value={formData.whatsappMobile}
              onChange={handleChange}
              icon={LucidePhone}
            />
            {!formData.whatsappMobile && <p className="text-red-500 text-xs">Mobile no. is required.</p>}
          </div>
        )}

        {formData.services.smsAuth && (
          <div>
            <label className="block text-gray-700 font-medium">
              SMS Mobile No.<span className="text-red-500">*</span>
            </label>
            <InputField
              type="tel"
              name="smsMobile"
              placeholder="SMS Mobile No"
              value={formData.smsMobile}
              onChange={handleChange}
              icon={LucidePhone}
            />
            {!formData.smsMobile && <p className="text-red-500 text-xs">SMS mobile no. is required.</p>}
          </div>
        )}
        <div className="col-span-full w-full">
          <Dropzone onUpload={handleUpload} />
          {uploadedFile && <p className="mt-4 text-green-600">{uploadedFile}</p>}
        </div>
      </form>
    </div>
  );
};

export default InnerModalInputs;
