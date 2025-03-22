import React, { useState } from "react";
import Select from "react-select";
import { X } from "lucide-react";

const options = [
  { value: "Paytm", label: "Paytm" },
  { value: "Loyalty Points", label: "Loyalty Points" },
  { value: "Google Pay", label: "Google Pay" },
  { value: "Amazon Pay", label: "Amazon Pay" },
];

const WalletDetails = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const removeChip = (value) => {
    setSelectedOptions(selectedOptions.filter((option) => option.value !== value));
  };

  return (
    <div className="max-w-lg  p-4 border rounded-lg shadow-md bg-white w-full">
      <label className="block text-gray-700 mb-2">Wallet Name</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Select Wallets..."
        className="w-full"
      />
      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedOptions.map((option) => (
          <div
            key={option.value}
            className="bg-[#5765F6] text-white px-3 py-1 rounded flex items-center gap-2"
          >
            {option.label}
            <button onClick={() => removeChip(option.value)} className="focus:outline-none">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      {/* Save Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-[#5765F6] text-white px-6 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default WalletDetails;
