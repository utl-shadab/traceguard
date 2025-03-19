import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const CustomSelect = ({
  options = [], 
  value,
  onChange, 
  placeholder = "Select an option", 
  className = "", 
}) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option); 
    setShowDropdown(false);
  };

  return (
    <div className={`relative w-full z-10 ${className}`}>
      
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full p-3 cursor-pointer border rounded-md shadow bg-white flex justify-between items-center text-gray-700"
      >
        {value || placeholder}
        {showDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto"
        >
          <div className="relative p-2 border-b">
            <Search className="absolute left-5 top-5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-2 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`p-3 text-gray-700 cursor-pointer hover:bg-gray-100 ${
                    value === option ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-500 text-center">No results found</li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default CustomSelect;
