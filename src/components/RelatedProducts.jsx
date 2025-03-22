"use client";

import { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { a } from "framer-motion/client";

// Updated Related Products Data
const relatedProducts = [
  { name: "Thermometer", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/2_96bf28f2-719a-45d5-8897-2ba9781cb929_576x.png?v=1674542823", rating: 3, count: 10 },
  { name: "Syrups", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/3_727fba55-6464-4e02-ba31-c5aaaec6b544_576x.png?v=1674542822", rating: 3, count: 10 },
  { name: "Injection", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/1_13ab1454-9672-42ff-8e49-53c8cb602e96_576x.png?v=1674542822", rating: 5, count: 10 },
  { name: "Thermometer", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/2_96bf28f2-719a-45d5-8897-2ba9781cb929_576x.png?v=1674542823", rating: 2, count: 10 },
  { name: "Syrups", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/3_727fba55-6464-4e02-ba31-c5aaaec6b544_576x.png?v=1674542822", rating: 5, count: 10 },
  { name: "Injection", image: "https://jewelleryishi.myshopify.com/cdn/shop/products/1_13ab1454-9672-42ff-8e49-53c8cb602e96_576x.png?v=1674542822", rating: 4, count: 10 },
];

const RelatedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,

    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } }, 
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } }, 
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } }, 
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }, 
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <h3 className="text-xl text-center font-bold text-[#5765F6] mb-4">Recommended</h3>
      <div className="relative">
        <Slider {...settings}>
          {relatedProducts.map((product, index) => (
            <motion.div
              key={index}
              className="p-4  relative flex flex-col items-center gap-6" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Product Image or Skeleton */}
              <div className="border p-3 mx-auto  border-gray-200 rounded-md">

              {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                ) : (
                    <div className="w-full h-40 bg-gray-700 animate-pulse rounded-md"></div>
                )}

              {/* Product Name */}
              <p className="font-semibold text-[#5765F6] mt-3 text-md">{product.name}</p>

              {/* Star Rating */}
              <div className="text-yellow-500 flex text-sm items-center gap-1">
                <Star size={14} /> <span>{product.rating} ({product.count} reviews)</span>
              </div>
                </div>
            </motion.div>
          ))}
        </Slider>

        {/* Navigation Arrows */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black cursor-pointer p-2 rounded-full shadow-md"
          onClick={() => document.querySelector(".slick-prev")?.click()}
        >
          <ArrowLeft size={20} />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black cursor-pointer p-2 rounded-full shadow-md"
          onClick={() => document.querySelector(".slick-next")?.click()}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-700 rounded-full mt-4 relative">
        <motion.div
          className="h-full bg-[#5765F6] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentSlide + 1) / relatedProducts.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default RelatedProducts;
