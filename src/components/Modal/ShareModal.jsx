import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ShareModal = ({ onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const shareLink = "https://xyz.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Copy Link Section */}
        <h2 className="text-lg font-semibold mb-2">Copy link</h2>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 px-3 py-2 text-gray-600 bg-gray-100 outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-4 py-2 font-semibold"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Share Options */}
        <h2 className="text-lg font-semibold mt-4">Share</h2>
        <div className="mt-2">
          <p className="text-gray-500">Coming soon...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareModal;
