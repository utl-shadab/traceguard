"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CompanySelect from "../components/ui/MultiSelectDropdown"; 
import Checkbox from "../components/ui/Checkbox"; // Your existing Checkbox component

const configOptions = [
  ["Company Logo", "Product Image", "Product Information"],
  ["Product Rating", "Share", "Feedback"],
  ["Genuine Audio", "Already Scanned Audio", "Genuine Message"],
  ["Already Scanned Message", "Other Person Scanned Message", "Promotional Messages"],
  ["Similar Products", "Similar Products Rating", "Social Links"],
  ["Ask For Details", "Already Scanned With No Info."]
];

const ProductDetails = () => {
  const [selectCompany, setSelectCompany] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedConfigs, setSelectedConfigs] = useState({});

  // Handle checkbox toggle
  const handleCheckboxChange = (config) => {
    setSelectedConfigs((prev) => ({
      ...prev,
      [config]: !prev[config],
    }));
  };

  // Handle Select All
  const handleSelectAll = () => {
    const newState = !isAllSelected;
    setIsAllSelected(newState);
    const updatedConfigs = {};
    configOptions.flat().forEach((config) => {
      updatedConfigs[config] = newState;
    });
    setSelectedConfigs(updatedConfigs);
  };

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Top Section - Dropdowns and Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
        <CompanySelect selectCompany={selectCompany} />
        <select className="border rounded-md p-2 w-full">
          <option>Select Product</option>
        </select>
        <Checkbox checked={false} readOnly color="blue" />
        <Checkbox checked={false} readOnly color="blue" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 bg-gray-800 text-white p-3 rounded-md font-semibold">
        <span>Configuration</span>
        <span className="text-center">
          Select All <Checkbox checked={isAllSelected} onChange={handleSelectAll} color="blue" />
        </span>
      </div>

      {/* Configuration Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        {configOptions.map((row, rowIndex) => (
          <motion.div 
            key={rowIndex} 
            className="flex items-center justify-between bg-gray-200 p-3 rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            {row.map((config, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between w-full p-2"
                whileHover={{ backgroundColor: "#e2e8f0" }}
              >
                <span className="text-gray-700">{config}</span>
                <Checkbox
                  checked={selectedConfigs[config] || false}
                  onChange={() => handleCheckboxChange(config)}
                  color="blue"
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        whileTap={{ scale: 0.95 }}
      >
        Save
      </motion.button>
    </motion.div>
  );
};

export default ProductDetails;
