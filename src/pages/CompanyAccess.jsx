import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAccess from "../hook/useAccess";
import CompanySelect from "../components/companyAccess/CompanySelect";
import CategoryList from "../components/companyAccess/CategoryList";
import AccessList from "../components/companyAccess/AccessList";
import ToggleAll from "../components/companyAccess/ToggleAll";
import { ChevronDown, ChevronUp } from "lucide-react";
import CustomSelect from "../components/companyAccess/CompanySelect";
const companies = [
  "Binario Technologies Pvt. Ltd.",
  "HSA GOLD",
  "Holoflex Limited",
  "VIDEOJET TECHNOLOGIES INDIA",
  "Bharat AgroTech Ltd.",
];
const CompanyAccess = () => {
  const {
    selectedCategories,
    toggleCategory,
    toggleSubcategory,
    setSelectedCategories,
    categoriesData,
  } = useAccess();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg min-h-screen w-full mx-auto">
      {/* Accordion Header */}
      <motion.div
        className="flex items-center justify-between cursor-pointer bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition"
        onClick={() => setIsOpen((prev) => !prev)}

      >
        <h2 className="text-lg font-semibold">Manage Company Access</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.div>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Left Side: Company Select + Category List */}
              <div className="w-full md:w-1/2 bg-white border-2 border-gray-200 rounded-lg p-4">
                {/* Company Select should be at the top inside the left panel */}
                <div className="mb-4">
                  <CustomSelect
                    options={companies}
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    placeholder="Choose Company"
                  />
                </div>

                {/* Toggle All Button */}
                <ToggleAll
                  categories={categoriesData}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />

                {/* Category List */}
                <CategoryList
                  categories={categoriesData}
                  toggleCategory={toggleCategory}
                  toggleSubcategory={toggleSubcategory}
                  selectedCategories={selectedCategories}
                />
              </div>

              {/* Right Side: Selected Access List */}
              <div className="w-full md:w-1/2 bg-white border-2 border-gray-200 rounded-lg p-4">
                <AccessList
                  selectedCategories={selectedCategories}
                  categories={categoriesData}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyAccess;
