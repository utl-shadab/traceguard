import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAccess from "../../hook/useAccess";
import ToggleAll from "./ToggleAll";
import CategoryList from "./CategoryList";
import AccessList from "./AccessList";
import CustomSelect from "./CompanySelect";
import { ChevronDown, ChevronUp } from "lucide-react";

const companies = [
  "Binario Technologies Pvt. Ltd.",
  "HSA GOLD",
  "Holoflex Limited",
  "VIDEOJET TECHNOLOGIES INDIA",
  "Bharat AgroTech Ltd.",
];

const CategoryManager = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const {
    selectedCategories,
    toggleCategory,
    toggleSubcategory,
    setSelectedCategories,
    categoriesData,
  } = useAccess();

  return (
    <div className="p-6 mt-10 bg-white rounded-2xl shadow-lg min-h-screen w-full mx-auto">
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
                {/* Company Selection */}
                <div className="mb-4">
                  <CustomSelect
                    options={companies}
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    placeholder="Choose Company"
                  />
                </div>

                {/* Category Section Hidden Until Company is Selected */}
                {selectedCompany && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Toggle All Button */}
                    <ToggleAll
                      categories={categoriesData}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                    />

                    {/* Category List */}
                    <CategoryList
                      categories={categoriesData}
                      toggleCategory={(id) =>
                        setSelectedCategories((prev) =>
                          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                        )
                      }
                      toggleSubcategory={(id) =>
                        setSelectedCategories((prev) =>
                          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                        )
                      }
                      selectedCategories={selectedCategories}
                    />
                  </motion.div>
                )}
              </div>

              {/* Right Side: Selected Access List - Always Visible */}
              <div className="w-full md:w-1/2 bg-white border-2 border-gray-200 rounded-lg p-4">
                <AccessList categories={categoriesData} selectedCategories={selectedCategories} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
