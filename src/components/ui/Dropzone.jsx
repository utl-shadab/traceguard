import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';

const Dropzone = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const uploadedFiles = Array.from(event.dataTransfer.files);
    handleFiles(uploadedFiles);
  };

  const handleFiles = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => simulateUpload(file.id));
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        onUpload && onUpload();
      }
    }, 300);
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    setUploadProgress((prev) => {
      const updatedProgress = { ...prev };
      delete updatedProgress[fileId];
      return updatedProgress;
    });
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
      <input
        type="file"
        multiple
        className="hidden"
        id="fileInput"
        onChange={(e) => handleFiles(Array.from(e.target.files))}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="text-center">
          {files.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {files.map(({ id }) => (
                <div key={id} className="relative w-20 h-20">
                  <img src={id} alt="Preview" className="w-full h-full object-cover rounded" />
                  <button
                    onClick={() => removeFile(id)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  >
                    <Trash size={14} />
                  </button>
                  {uploadProgress[id] > 0 && uploadProgress[id] < 100 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress[id]}%` }}
                      className="h-1 bg-[#5765F6] mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-600"
            >
              
              <span className="block">Click here to upload your file or drag and drop.</span>
              <span className="block text-sm">Supported Format: SVG, JPG, PNG (10mb each)</span>
            </motion.div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Dropzone;
