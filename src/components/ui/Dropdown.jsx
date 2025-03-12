import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border p-2 rounded-md text-left flex justify-between items-center"
      >
        {selectedOption}
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full bg-white border rounded-md mt-2 shadow-lg z-10"
        >
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                  option === selectedOption ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
                {option === selectedOption && <span>&#10003;</span>}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
