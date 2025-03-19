"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Share2, MessageCircle, Users } from "lucide-react";
import FeedbackModal from "../components/Modal/FeedbackModal";
import ShareModal from "../components/Modal/ShareModal";

const QRCodeDamage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [activeTab, setActiveTab] = useState("loyalty");

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Banner */}
      <motion.div
        className="bg-green-500 text-white text-center py-2 rounded-md text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Thanks for buying a genuine product
      </motion.div>

      {/* Product Section */}
      <div className="flex flex-col items-center gap-4 mt-4">
        {/* Product Image */}
        <div className="w-full max-w-[200px] flex items-center justify-center bg-gray-200 rounded-md p-4">
          <img src="/tab.jpg" alt="Product" className="w-full h-auto object-cover" />
        </div>

        {/* Table with Product Details */}
        <div className="w-full text-sm">
          <h2 className="text-lg font-bold mb-3 text-center">Tablets</h2>

          <table className="w-full border border-gray-300 text-xs">
            <tbody>
              {[
                ["Company Name", "Binario Technologies"],
                ["Email", "info@binario.co.in"],
                ["Mobile", "7778677788"],
                ["Dosage", "1 Tablet per day"],
                ["USP", "0.50 Rs"],
                ["Mfg. Date", "2025-03-17"],
              ].map(([label, value], index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-semibold">{label}</td>
                  <td className="p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4">
  {/* Tabs Grid (2x2 Layout) */}
  <div className="grid grid-cols-2 gap-2 border-b pb-2 text-xs text-center">
    {/* Loyalty Tab */}
    <div
      className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer rounded-md ${
        activeTab === "loyalty" ? "text-blue-600 font-semibold bg-gray-100" : "text-gray-600"
      }`}
      onClick={() => setActiveTab("loyalty")}
    >
      <Users size={18} />
      LOYALTY
    </div>

    {/* Rating Tab */}
    <div
      className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer rounded-md ${
        activeTab === "rating" ? "text-blue-600 font-semibold bg-gray-100" : "text-gray-600"
      }`}
      onClick={() => setActiveTab("rating")}
    >
      <Star size={18} />
      RATING
    </div>

    {/* Feedback Tab */}
    <div
      className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer rounded-md ${
        activeTab === "feedback" ? "text-blue-600 font-semibold bg-gray-100" : "text-gray-600"
      }`}
      onClick={() => setShowFeedbackModal(true)}
    >
      <MessageCircle size={18} />
      FEEDBACK
    </div>

    {/* Share Tab */}
    <div
      className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer rounded-md ${
        activeTab === "share" ? "text-blue-600 font-semibold bg-gray-100" : "text-gray-600"
      }`}
      onClick={() => setShowShareModal(true)}
    >
      <Share2 size={18} />
      SHARE
    </div>
  </div>

  {/* Tab Content */}
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-3 bg-gray-100 p-3 rounded-md text-center text-xs"
  >
    {activeTab === "loyalty" && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>}

    {activeTab === "rating" && (
      <div className="text-center">
        <h3 className="text-sm font-semibold">How is your order?</h3>
        <p className="text-gray-500 text-xs">Please take a moment to rate and review...</p>
        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={24}
              className={`cursor-pointer mx-1 ${selectedRating >= num ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setSelectedRating(num)}
            />
          ))}
        </div>
      </div>
    )}
  </motion.div>
</div>

      {/* Feedback Modal */}
      {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} />}

      {/* Share Modal */}
      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default QRCodeDamage;
