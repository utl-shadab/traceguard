import React from "react";
import { motion } from "framer-motion";
import { LucideX } from "lucide-react";

const CustomModal = ({ isOpen, onClose, title, children, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start top-10 justify-center z-50" >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: "-20%" }}
        animate={{ scale: 1, opacity: 1, y: "0%" }}
        exit={{ scale: 0.7, opacity: 0, y: "-20%" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-gray-50 rounded-lg shadow-lg w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mt-1/2"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 cursor-pointer bg-blue-200 rounded-full">
            <LucideX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">{children}</div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 bg-gray-200 cursor-pointer rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white font-semibold cursor-pointer rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomModal;
