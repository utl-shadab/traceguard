import { motion } from "framer-motion";
import Checkbox from "../ui/Checkbox";

const ToggleAll = ({ categories, selectedCategories, setSelectedCategories }) => {
  const isAllSelected = categories.every(
    (category) =>
      selectedCategories.includes(category.id) &&
      category.subcategories.every((sub) => selectedCategories.includes(sub.id))
  );

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedCategories([]);
    } else {
      const allIds = categories.flatMap((cat) => [
        cat.id,
        ...cat.subcategories.map((sub) => sub.id),
      ]);
      setSelectedCategories(allIds);
    }
  };

  return (
    <div
      className="flex items-center my-2 justify-between bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 transition-all"
      onClick={handleToggleAll}
    >   
      <span className="font-semibold">Toggle All</span>
      <Checkbox  checked={isAllSelected} readOnly color="blue"  />
      
    </div>
  );
};

export default ToggleAll;
