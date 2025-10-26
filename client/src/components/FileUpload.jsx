import React from 'react';

const FileUpload = ({ selectedFiles, onFileSelect, onFileRemove, onConvert, isConverting }) => {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-800 mb-4">
        Select images to convert
      </label>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-gray-600 transition-colors">
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
            className="w-12 h-12 text-gray-500 mb-4"
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
          <span className="text-lg font-medium text-gray-700">
            Click to upload or drag and drop
          </span>
          <span className="text-sm text-gray-600 mt-2">
            PNG, JPG, JPEG up to 10MB each
          </span>
        </label>
      </div>
      
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">
            {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {onFileRemove && (
                  <button
                    onClick={() => onFileRemove(index)}
                    className="ml-3 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full p-1 transition-colors"
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
              {isConverting ? 'Converting...' : `Convert ${selectedFiles.length} to WebP`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
