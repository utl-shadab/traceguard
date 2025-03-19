import { motion } from "framer-motion";
import { X } from "lucide-react";

const FeedbackModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center   z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">Submit Feedback</h2>

        <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        <input type="text" placeholder="Phone" className="w-full mb-2 p-2 border rounded" />
        <textarea placeholder="Feedback" className="w-full mb-2 p-2 border rounded"></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-2" onClick={onClose}>
          Submit
        </button>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
