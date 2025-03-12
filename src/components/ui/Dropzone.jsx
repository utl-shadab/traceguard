import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Dropzone = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onUpload && onUpload();
      }
    }, 300);
  };

  return (
    <div
      className={`border-2 p-4 rounded-md transition-all duration-300 ${
        isDragging ? 'border-dashed border-blue-600' : 'border-blue-600'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="text-center">
        {file ? (
          <img src={file} alt="Preview" className="w-full h-auto" />
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-600"
            >
              <span className="block mb-2">Company Logo</span>
              <span className="block">Click here to upload your file or drag and drop.</span>
              <span className="block text-sm">Supported Format: SVG, JPG, PNG (10mb each)</span>
            </motion.div>
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
            className="h-1 bg-blue-600 mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default Dropzone;
