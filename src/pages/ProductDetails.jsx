"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Checkbox from "../components/ui/Checkbox";
import CustomSelect from "../components/companyAccess/CompanySelect";
import Dropdown from "../components/ui/Dropdown";
const companies = [
  "Binario Technologies Pvt. Ltd.",
  "HSA GOLD",
  "Holoflex Limited",
  "VIDEOJET TECHNOLOGIES INDIA",
  "Bharat AgroTech Ltd.",
];
const Products = [
  "Tablets",
  "Syrups",
  "Injections",
  "Thermometer",
];

const configOptions = [
  ["Company Logo", "Product Image", "Product Information"],
  ["Product Rating", "Share", "Feedback"],
  ["Genuine Audio", "Already Scanned Audio", "Genuine Message"],
  ["Already Scanned Message", "Other Person Scanned Message", "Promotional Messages"],
  ["Similar Products", "Similar Products Rating", "Social Links"],
  ["Ask For Details", "Already Scanned With No Info."]
];

const ProductDetails = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedConfigs, setSelectedConfigs] = useState({});
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [isConfigureAll, setIsConfigureAll] = useState(false);
  const [isCompanyBelowDetail, setIsCompanyBelowDetail] = useState(false);
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
      className="bg-white shadow-md rounded-lg p-6 w-full mx-auto mt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Top Section - Dropdowns and Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
        {/* Select Company */}
        <CustomSelect
          options={companies}
          value={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Company"
        />

        {/* Select Product */}
        <CustomSelect
          options={Products}
          value={selectedProducts}
          onChange={setSelectedProducts}
          placeholder="Select Products"
        />

        <div className="col-span-2 flex flex-col md:flex-row md:space-x-6 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isCompanyBelowDetail}
              onChange={() => setIsCompanyBelowDetail(!isCompanyBelowDetail)}
              color="blue"
            />
            <span className="text-gray-700">Company below product detail</span>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isConfigureAll}
              onChange={() => setIsConfigureAll(!isConfigureAll)}
              color="blue"
            />
            <span className="text-gray-700">Configure for all products</span>
          </div>
        </div>
      </div>

      {/* Table Header */}
      {/* <div className="grid grid-cols-3 bg-gray-200 text-black p-3 rounded-md font-semibold">
        <span>Configuration</span>
        <span className="text-center">
          Select All <Checkbox checked={isAllSelected} onChange={handleSelectAll} color="blue" />
        </span>
      </div> */}
      <div className="grid grid-cols-3 bg-gray-200 text-black p-3 rounded-md font-semibold">
        <span className="pl-2">Configuration</span>
        <span className="text-center flex justify-center items-center space-x-2">
          <span>Select All</span>
          <Checkbox checked={isAllSelected} onChange={handleSelectAll} color="blue" />
        </span>
      </div>

      {/* Configuration Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        {configOptions.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex items-center  flex-col justify-between bg-gray-200 p-3 rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            {row.map((config, index) => (
              <motion.div
                key={index}
                className="flex items-center  justify-between w-full p-2"
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
      <div className="flex justify-center mt-4">
        <motion.button
          className="w-fit bg-blue-600 cursor-pointer text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
       
      </div>
    </motion.div>
  );
};

export default ProductDetails;
