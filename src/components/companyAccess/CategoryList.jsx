import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Checkbox from "../ui/Checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";

const CategoryList = ({ categories, toggleCategory, toggleSubcategory, selectedCategories }) => {
  const [openCategories, setOpenCategories] = useState({});

  // const handleToggle = (categoryId) => {
  //   setOpenCategories((prev) => ({
  //     ...prev,
  //     [categoryId]: !prev[categoryId],
  //   }));
  //   toggleCategory(categoryId);
  // };


  const handleToggle = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // const handleCategorySelect = (categoryId, e) => {
  //   e.stopPropagation();
  //   toggleCategory(categoryId);
  //   console.log(categoryId)
  // };

  const handleCategorySelect = (category, e) => {
    e.stopPropagation(); // Prevents accordion toggle

    const isChecked = selectedCategories.includes(category.id);

    if (isChecked) {
      // If unchecked, remove parent and all its subcategories
      toggleCategory(category.id);
      category.subcategories.forEach((sub) => {
        if (selectedCategories.includes(sub.id)) {
          toggleSubcategory(sub.id);
        }
      });
    } else {
      // If checked, only select the parent (not the subcategories)
      toggleCategory(category.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md  w-full">

      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-3">
            {/* Parent Category */}
            <motion.div
              className="flex items-center justify-between cursor-pointer p-3  rounded-md hover:bg-gray-100 transition"
              onClick={() => handleToggle(category.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                {category.subcategories.length > 0 ? (
                  <motion.div
                    animate={{ rotate: openCategories[category.id] ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </motion.div>
                ) : (
                  <div className="w-4 h-4" />
                )}
                <span>{category.name}</span>
              </div>
              <div onClick={(e) => handleCategorySelect(category, e)}>
                <Checkbox checked={selectedCategories.includes(category.id)} color="blue" />
              </div>
            </motion.div>

            {/* Subcategories (Accordion Effect) */}
            <AnimatePresence>
              {openCategories[category.id] && (
                <motion.ul
                  className="pl-8 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {category.subcategories.map((sub) => (
                    <motion.li
                      key={sub.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>{sub.name}</span>
                      <Checkbox
                        checked={selectedCategories.includes(sub.id)}
                        onChange={() => toggleSubcategory(sub.id)}

                        color="blue"
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
