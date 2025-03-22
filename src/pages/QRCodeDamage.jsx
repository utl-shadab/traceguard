"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Share2, MessageSquare, Info, ArrowLeft, ArrowRight, Facebook, Instagram, Linkedin, Youtube, HandHeart, HandCoins, Ellipsis, EllipsisVertical, Building2, Mail, Phone, Pill, BadgePercent, Calendar } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import CustomerReviews from "../components/CustomerReviews";
const productImages = [
  "https://jewelleryishi.myshopify.com/cdn/shop/products/1_a7e7b4f3-0fe2-416c-8a44-e06c32241bf0_576x.png?v=1675658002",
  "https://jewelleryishi.myshopify.com/cdn/shop/products/20_6e235914-98d7-4c4e-9b78-ce5cdc02fe5b_576x.png?v=1674544903",
  "https://jewelleryishi.myshopify.com/cdn/shop/products/1_848a3f42-0ac8-4d63-8091-281aaa047824_576x.png?v=1675658001",
  "https://jewelleryishi.myshopify.com/cdn/shop/products/20_6e235914-98d7-4c4e-9b78-ce5cdc02fe5b_576x.png?v=1674544903",
];

const QRCodeDamage = ({ count }) => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [reviewCount, setReviewCount] = useState(0);
  const [activeTab, setActiveTab] = useState("loyalty");
  useEffect(() => {
    // Get review count from localStorage
    const count = localStorage.getItem("reviewCount") || 0;
    setReviewCount(count);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* App Install Banner */}
      <div className="bg-gray-800 text-white flex justify-between p-3 items-center">
        <span>Real4Sure app install</span>
        <button className="border px-3 py-1 rounded">Install Now</button>
      </div>

      {/* Success Banner */}
      <div className="bg-green-500 text-white text-center py-2 font-semibold flex justify-center items-center gap-2">
        <span className="text-lg">✔</span> Thanks for buying a genuine product
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt="Product"
              className="w-full  rounded-md "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-wrap justify-center md:justify-start  max-w-7xl w-full   gap-5 mt-4">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className={`w-24 h-24 rounded-md cursor-pointer transition-all border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-300"
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tablets</h2>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={18} /> <p>{reviewCount} reviews</p>
            </div>
            {/* Tabs Section */}
            <div className="flex flex-wrap  gap-3 mt-3 ">
              {/* Loyalty Tab */}
              <button onClick={() => setActiveTab("loyalty")} className={`py-1.5 px-4 rounded-md flex gap-3 items-center ${activeTab === "loyalty" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <HandCoins size={20} />
                loyalty
              </button>

              {/* Share Tab */}
              <button onClick={() => setActiveTab("share")} className={`py-1.5 px-4 rounded-md flex gap-3 items-center  ${activeTab === "share" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                <Share2 size={20} />
                Share
              </button>
              <a href="#reviews" className="py-1.5 px-4 rounded-md flex gap-3 items-center bg-gray-200 hover:bg-blue-500 hover:text-white transition">
                <Star size={20} />
                Reviews
              </a>

              <a href="#info" className="py-1.5 px-4 rounded-md flex gap-3 items-center bg-gray-200 hover:bg-blue-500 hover:text-white transition">
                <EllipsisVertical size={20} />
                Information
              </a>
            </div>

            {/* Tab Content with Framer Motion */}
            <div className="mt-4 p-4 border border-gray-300 rounded-md">
              <AnimatePresence mode="wait">
                {activeTab === "loyalty" && (
                  <motion.p
                    key="loyalty"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-gray-700"
                  >
                    Please register to Real4Sure mobile app to earn loyalty points.
                  </motion.p>
                )}

                {activeTab === "share" && (
                  <motion.div
                    key="share"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-3"
                  >
                    <div className="w-12 h-12 bg-[#06D6AE] rounded-full flex items-center justify-center">
                      <Facebook size={20} className="text-black" />
                    </div>
                    <div className="w-12 h-12 bg-[#06D6AE] rounded-full flex items-center justify-center">
                      <Youtube size={20} className="text-black" />
                    </div>
                    <div className="w-12 h-12 bg-[#06D6AE] rounded-full flex items-center justify-center">
                      <Instagram size={20} className="text-black" />
                    </div>
                    <div className="w-12 h-12 bg-[#06D6AE] rounded-full flex items-center justify-center">
                      <Linkedin size={20} className="text-black" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div id="info" className="mt-10  mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>
              <div className="grid grid-cols-1  gap-4">
                <div className="flex items-center gap-3">
                  <Building2 size={20} className="text-black" />
                  <p className="text-gray-700"><strong>Company:</strong> Binario Technologies</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-black" />
                  <p className="text-gray-700"><strong>Email:</strong> info@binario.co.in</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-black" />
                  <p className="text-gray-700"><strong>Mobile:</strong> 7778677788</p>
                </div>
                <div className="flex items-center gap-3">
                  <Pill size={20} className="text-black" />
                  <p className="text-gray-700"><strong>Dosage:</strong> 1 Tablet per day</p>
                </div>
                <div className="flex items-center gap-3">
                  <BadgePercent size={20} className="text-black" />
                  <p className="text-gray-700"><strong>USP:</strong> 0.50 Rs</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-black" />
                  <p className="text-gray-700"><strong>Mfg. Date:</strong> 2025-03-17</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* product reviews */}
        <CustomerReviews />
      </div>

      {/* Related Products Slider */}
      <RelatedProducts />
    </div>
  );
};

export default QRCodeDamage;
