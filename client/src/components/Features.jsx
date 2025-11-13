const Features = () => {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="text-center">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Faster Loading</h3>
        <p className="text-gray-700 text-sm">
          WebP images load up to 30% faster than traditional formats
        </p>
      </div>

      <div className="text-center">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Smaller Files</h3>
        <p className="text-gray-700 text-sm">
          Reduce file sizes by 25-35% without quality loss
        </p>
      </div>

      <div className="text-center">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">High Quality</h3>
        <p className="text-gray-700 text-sm">
          Maintain excellent image quality with modern compression
        </p>
      </div>
    </div>
  );
};

export default Features;
