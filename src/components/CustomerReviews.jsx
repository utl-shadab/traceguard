"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Image as ImageIcon, Video, X, Maximize } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        if (!name || !email || rating === 0 || !title || !review) {
            alert("Please fill all required fields.");
            return;
        }

        const newReview = { name, email, rating, title, review, image };
        onSubmit(newReview);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-lg"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#5765F6]">Write a Review</h2>
                    <button onClick={onClose} className="text-black cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Review Form */}
                <div className="mt-4 space-y-4">
                    {/* Name Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-black font-semibold">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-2 border rounded-md border-gray-400 placeholder-black text-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            {/* Email Input */}
                            <label className="text-black font-semibold">Your Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2 border rounded-md border-gray-400 placeholder-black text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Star Rating */}
                    <label className="text-black font-semibold">Your Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                                key={num}
                                size={24}
                                className={`cursor-pointer ${rating >= num ? "text-yellow-500" : "text-gray-400"}`}
                                onClick={() => setRating(num)}
                            />
                        ))}
                    </div>

                    {/* Review Title */}
                    <label className="text-black font-semibold">Review Title</label>
                    <input
                        type="text"
                        placeholder="Enter review title"
                        className="w-full p-2 border border-gray-400 placeholder-black text-black rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Review Text */}
                    <label className="text-black font-semibold">Your Review</label>
                    <textarea
                        placeholder="Write your review..."
                        className="w-full p-2 border rounded-md border-gray-400 placeholder-black text-black"
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Image Upload */}
                        <div>
                            <label className="text-black font-semibold">Upload Image</label>
                            <div className="relative border-gray-400 border rounded-md p-2 h-28 w-full flex items-center justify-center">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="h-full w-full object-cover rounded-md" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <ImageIcon size={20} />
                                        <span>Add an Image</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                        </div>


                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-[#5765F6] text-white py-2 rounded-md" onClick={handleSubmit}>
                        Submit Review
                    </button>
                </div>
            </motion.div>
        </div>

    ) : null;
};
const ImageWithFallback = ({ src, onClick }) => {
    const [isError, setIsError] = useState(false);

    return (
        <div className="relative w-16 h-16 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-md overflow-hidden">
            {isError ? (
                <div className="w-full h-full bg-gray-400 animate-pulse flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
            ) : (
                <img
                    src={src}
                    alt="Review"
                    className="w-full h-full object-cover"
                    onError={() => setIsError(true)}
                    onClick={onClick}
                />
            )}
        </div>
    );
};
const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const initialCount = 6;
    const [selectedMedia, setSelectedMedia] = useState(null);
    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(storedReviews);
    }, []);


    const addReview = (newReview) => {
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        localStorage.setItem("reviewCount", updatedReviews.length);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 my-10 text-white" id="reviews">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[#5765F6]">Customer Reviews</h2>

                {/* Review Grid - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                    {reviews.map((review, index) => (
                        <ImageWithFallback
                            key={index}
                            src={review.image}
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-md cursor-pointer"
                            onClick={() => setSelectedMedia(review.image)}
                        />
                    ))}
                </div>

                {/* Write Review Button - Centered on Mobile */}
                <button
                    className="bg-white text-black px-4 py-2 rounded-md border w-full sm:w-auto mt-2 sm:mt-0"
                    onClick={() => setShowModal(true)}
                >
                    Write a Review
                </button>
            </div>
            <div className="mt-4 flex gap-4 items-center">
                <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} />
                    ))}
                </div>
                <p className="text-amber-400">{reviews.length} reviews</p>
            </div>


            {/* Modal for Full View */}
            {selectedMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                    <button className="absolute top-5 right-5 text-white" onClick={() => setSelectedMedia(null)}>
                        <X size={24} />
                    </button>
                    {typeof selectedMedia === "string" ? (
                        <img src={selectedMedia} className="w-1/2 h-1/2 object-contain rounded-lg" />
                    ) : null}
                </div>
            )}
            {/* Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {reviews.slice(0, visibleCount).map((review, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-[#067761] p-4 rounded-md border border-green-400"
                    >
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        <div className="flex gap-1 text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} />
                            ))}
                        </div>
                        <p className="font-bold mt-2">{review.title}</p>
                        <p className="text-sm">{review.review}</p>
                    </motion.div>
                ))}
            </div>

            {/* Load More Button */}
            {reviews.length > initialCount && (
                <div className="flex justify-center mt-6">
                    {visibleCount < reviews.length ? (
                        <button
                            className="bg-[#5765F6] text-white px-6 py-2 rounded-md "
                            onClick={() => setVisibleCount((prev) => prev + 6)}
                        >
                            Load More Reviews
                        </button>
                    ) : (
                        <button
                            className="bg-[#5765F6] text-white px-6 py-2 rounded-md  "
                            onClick={() => setVisibleCount(initialCount)}
                        >
                            Show Less
                        </button>
                    )}
                </div>
            )}

            {/* Review Modal */}
            <ReviewModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={addReview} />
        </div>
    );
};

export default CustomerReviews;
