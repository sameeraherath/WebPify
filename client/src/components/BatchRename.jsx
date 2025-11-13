import { useState } from "react";

const BatchRename = ({ onApplyPattern, fileCount }) => {
  const [pattern, setPattern] = useState("{name}");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [startNumber, setStartNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const patterns = {
    "{name}": "Original filename",
    "{number}": "Sequential number (1, 2, 3...)",
    "{date}": "Current date (YYYY-MM-DD)",
    "{time}": "Current time (HH-MM-SS)",
    "{random}": "Random string (6 chars)",
  };

  const generatePreview = () => {
    let preview = prefix;

    if (pattern === "{name}") {
      preview += "image";
    } else if (pattern === "{number}") {
      preview += startNumber.toString().padStart(3, "0");
    } else if (pattern === "{date}") {
      const date = new Date();
      preview += date.toISOString().split("T")[0];
    } else if (pattern === "{time}") {
      const time = new Date();
      preview += time.toTimeString().split(" ")[0].replace(/:/g, "-");
    } else if (pattern === "{random}") {
      preview += "a1b2c3";
    }

    preview += suffix;
    return preview + ".webp";
  };

  const handleApply = () => {
    onApplyPattern({
      pattern,
      prefix,
      suffix,
      startNumber,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setPattern("{name}");
    setPrefix("");
    setSuffix("");
    setStartNumber(1);
    onApplyPattern(null);
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800  text-white rounded-lg hover:bg-black transition-colors"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Batch Rename
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Batch Rename Settings
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
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
      </div>

      <div className="space-y-4">
        {/* Pattern Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Naming Pattern
          </label>
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(patterns).map(([key, desc]) => (
              <option key={key} value={key}>
                {key} - {desc}
              </option>
            ))}
          </select>
        </div>

        {/* Prefix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prefix (optional)
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="e.g., webp_"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Suffix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suffix (optional)
          </label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder="e.g., _converted"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Start Number (only for {number} pattern) */}
        {pattern === "{number}" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Number
            </label>
            <input
              type="number"
              min="1"
              value={startNumber}
              onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <p className="font-mono text-sm text-gray-800">{generatePreview()}</p>
          {fileCount > 1 && pattern === "{number}" && (
            <p className="font-mono text-sm text-gray-500 mt-1">
              {prefix}
              {(startNumber + 1).toString().padStart(3, "0")}
              {suffix}.webp
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {fileCount} file{fileCount !== 1 ? "s" : ""} will be renamed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg  hover:bg-black transition-colors font-medium"
          >
            Apply Pattern
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchRename;
