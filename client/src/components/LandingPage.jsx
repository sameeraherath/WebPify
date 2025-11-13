import { useState } from "react";

const LandingPage = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleGetStarted = () => {
    setIsVisible(false);
    setTimeout(() => {
      onGetStarted();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              WebPify
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Convert Images to WebP Format
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Optimize your images with modern WebP compression. Reduce file
              sizes by up to 35% while maintaining quality.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-20">
            <button
              onClick={handleGetStarted}
              className="bg-white text-gray-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </button>
            <p className="text-gray-400 mt-4 text-sm">
              No signup required • Process unlimited images
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-400">
                Convert multiple images in seconds with our optimized
                server-side processing. No waiting, no delays.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-2xl font-bold mb-4">Smaller Files</h3>
              <p className="text-gray-400">
                Reduce image file sizes by 25-35% without visible quality loss.
                Perfect for web optimization.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Private</h3>
              <p className="text-gray-400">
                Your images are processed in memory and never stored. Complete
                privacy guaranteed.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h4 className="text-xl font-semibold mb-2">Upload Images</h4>
                <p className="text-gray-400 text-sm">
                  Select one or multiple images from your device
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Choose Settings (Optional)
                </h4>
                <p className="text-gray-400 text-sm">
                  Adjust quality and apply batch rename patterns
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h4 className="text-xl font-semibold mb-2">Convert</h4>
                <p className="text-gray-400 text-sm">
                  Click convert and watch the magic happen
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h4 className="text-xl font-semibold mb-2">Download</h4>
                <p className="text-gray-400 text-sm">
                  Get your optimized WebP images instantly
                </p>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">
              Supported Formats
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["PNG", "JPEG", "JPG", "BMP", "TIFF", "GIF", "WebP"].map(
                (format) => (
                  <div
                    key={format}
                    className="bg-gray-700 px-6 py-3 rounded-lg font-semibold"
                  >
                    {format}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">35%</div>
              <p className="text-gray-400">Average Size Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">∞</div>
              <p className="text-gray-400">Unlimited Conversions</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">0%</div>
              <p className="text-gray-400">Data Stored</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Optimize Your Images?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start converting your images to WebP format right now
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-gray-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-400">
        <p className="text-lg font-medium mb-2">WebPify</p>
        <p className="text-sm">
          © {new Date().getFullYear()} WebPify. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
