import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isConverterPage = location.pathname === "/converter";

  return (
    <div className="text-center mb-12">
      <Link to="/" className="inline-block">
        <h1 className="text-4xl font-bold text-white mb-4 hover:text-gray-200 transition-colors cursor-pointer">
          WebPify
        </h1>
      </Link>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Convert your images to WebP format for better performance and smaller
        file sizes
      </p>
      {isConverterPage && (
        <Link
          to="/"
          className="inline-flex items-center mt-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      )}
    </div>
  );
};

export default Header;
