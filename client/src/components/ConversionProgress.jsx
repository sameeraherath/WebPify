const ConversionProgress = ({ isConverting, fileCount = 1 }) => {
  if (!isConverting) return null;

  return (
    <div className="mb-8">
      <div className="bg-gray-200 border border-gray-400 rounded-lg p-6">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 mr-3"></div>
          <span className="text-gray-800 font-medium">
            Converting {fileCount > 1 ? `${fileCount} images` : "your image"} to
            WebP format...
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversionProgress;
