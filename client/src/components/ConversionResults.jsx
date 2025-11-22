const ConversionResults = ({
  convertedFiles,
  onDownload,
  onDownloadAllAsZip,
}) => {
  if (!convertedFiles || convertedFiles.length === 0) return null;

  return (
    <div className="border-t pt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Conversion Complete! 🎉
        </h3>
        {convertedFiles.length > 1 && onDownloadAllAsZip && (
          <button
            onClick={onDownloadAllAsZip}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Download All as ZIP
          </button>
        )}
      </div>
      <div className="space-y-3">
        {convertedFiles.map((file, index) => (
          <div
            key={index}
            className="bg-gray-200 border border-gray-400 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-700">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => onDownload(index)}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionResults;
