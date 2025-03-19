import { motion } from "framer-motion";

const ProductSlider = () => {
  return (
    <motion.div className="mt-8 p-4 bg-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Recommended Products</h3>
      <div className="flex space-x-4 overflow-auto">
        {/* Add product images dynamically here */}
      </div>
    </motion.div>
  );
};

export default ProductSlider;
