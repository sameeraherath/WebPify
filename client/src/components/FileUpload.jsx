import React, { useState } from "react";

const FileUpload = ({
  selectedFiles,
  previewUrls,
  onFileSelect,
  onFileRemove,
  onConvert,
  isConverting,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if we're leaving the drop zone completely
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      // Create a synthetic event that mimics the file input change event
      const syntheticEvent = {
        target: {
          files: imageFiles,
        },
      };
      onFileSelect(syntheticEvent);
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-800 mb-4">
        Select images to convert
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-gray-800 bg-gray-100 scale-105"
            : "border-gray-400 hover:border-gray-600"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg
            className={`w-12 h-12 mb-4 transition-colors ${
              isDragging ? "text-gray-800" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span
            className={`text-lg font-medium transition-colors ${
              isDragging ? "text-gray-900" : "text-gray-700"
            }`}
          >
            {isDragging
              ? "Drop images here"
              : "Click to upload or drag and drop"}
          </span>
          <span className="text-sm text-gray-600 mt-2">
            PNG, JPG, JPEG up to 10MB each
          </span>
        </label>
      </div>

      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">
            {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""}{" "}
            selected
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-3 rounded hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  {previewUrls[index] && (
                    <img
                      src={previewUrls[index]}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /%3E%3C/svg%3E';
                      }}
                    />
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {/* Remove Button */}
                {onFileRemove && (
                  <button
                    onClick={() => onFileRemove(index)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full p-2 transition-colors flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onConvert}
              disabled={isConverting}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isConverting
                ? "Converting..."
                : `Convert ${selectedFiles.length} to WebP`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
