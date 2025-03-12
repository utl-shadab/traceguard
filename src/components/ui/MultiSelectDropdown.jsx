import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Checkbox from './Checkbox'; 

const MultiSelectDropdown = ({ options, onApply, onCreateNew }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleApply = () => {
    onApply(selectedOptions);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border p-2 rounded-md text-left"
      >
        Choose space 
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full bg-white border rounded-md mt-2 shadow-lg z-10"
        >
          <div className="p-2">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <Checkbox 
                  checked={selectedOptions.includes(option)} 
                  onChange={() => toggleOption(option)} 
                  color="blue" 
                />
                <span className="ml-2">{option}</span>
              </div>
            ))}
            <div
              className="flex items-center p-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
              onClick={onCreateNew}
            >
              <span className="mr-2">+</span> Create new space
            </div>
          </div>
          <div className="flex justify-between p-2 border-t">
            <button
              onClick={handleClearAll}
              className="text-gray-700 hover:text-gray-900"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
