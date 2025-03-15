import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const companies = [
  "Binario Technologies Pvt. Ltd.",
  "HSA GOLD",
  "Holoflex Limited",
  "VIDEOJET TECHNOLOGIES INDIA",
  "Bharat AgroTech Ltd.",
];

const CompanySelect = ({ selectCompany }) => {
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (company) => {
    setSelectedCompany(company);
    selectCompany(company);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full z-50">
      {/* Dropdown Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full p-3 cursor-pointer border rounded-md shadow bg-white flex justify-between items-center text-gray-700"
      >
        {selectedCompany || "Select Company"}
        {showDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown List */}
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto"
        >
          {/* Search Box */}
          <div className="relative p-2 border-b">
            <Search className="absolute left-5 top-5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-2 py-2 border rounded-md focus:outline-none"
            />
          </div>

          {/* Company List */}
          <ul>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <li
                  key={company}
                  className={`p-3 text-gray-700 cursor-pointer hover:bg-gray-100 ${
                    selectedCompany === company ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleSelect(company)}
                >
                  {company}
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

export default CompanySelect;
