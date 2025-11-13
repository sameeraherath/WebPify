import { useState } from "react";
import JSZip from "jszip";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import BatchRename from "../components/BatchRename";
import ConversionProgress from "../components/ConversionProgress";
import ConversionResults from "../components/ConversionResults";
import Features from "../components/Features";
import Footer from "../components/Footer";

function ConverterPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);
  const [renamePattern, setRenamePattern] = useState(null);

  const getApiUrl = () => {
    let baseUrl = null;

    if (import.meta.env.VITE_API_URL) {
      baseUrl = import.meta.env.VITE_API_URL;
      console.log("Using API URL from environment:", baseUrl);
    } else {
      const hostname = window.location.hostname;
      const isProduction = hostname !== "localhost" && hostname !== "127.0.0.1";

      if (isProduction) {
        baseUrl = "https://webpify-fpst.onrender.com";
        console.log("Using production base URL:", baseUrl);
        console.log("Current hostname:", hostname);
      } else {
        baseUrl = "http://localhost:8000";
        console.log("Using development base URL:", baseUrl);
      }
    }

    if (!baseUrl.endsWith("/api/convert")) {
      const separator = baseUrl.endsWith("/") ? "" : "/";
      baseUrl = baseUrl + separator + "api/convert";
      console.log("Constructed full API URL:", baseUrl);
    }

    return baseUrl;
  };

  const API_URL = getApiUrl();

  console.log("API_URL initialized to:", API_URL);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setConvertedFiles([]);
      setError(null);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleFileRemove = (index) => {
    URL.revokeObjectURL(previewUrls[index]);

    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleApplyRenamePattern = (pattern) => {
    setRenamePattern(pattern);
  };

  const generateFileName = (originalName, index, pattern) => {
    if (!pattern) {
      return originalName.replace(/\.[^/.]+$/, "") + ".webp";
    }

    const baseName = originalName.replace(/\.[^/.]+$/, "");
    let newName = pattern.prefix || "";

    if (pattern.pattern === "{name}") {
      newName += baseName;
    } else if (pattern.pattern === "{number}") {
      const num = (pattern.startNumber + index).toString().padStart(3, "0");
      newName += num;
    } else if (pattern.pattern === "{date}") {
      const date = new Date();
      newName += date.toISOString().split("T")[0];
      if (selectedFiles.length > 1) {
        newName += "_" + (index + 1);
      }
    } else if (pattern.pattern === "{time}") {
      const time = new Date();
      newName += time.toTimeString().split(" ")[0].replace(/:/g, "-");
      if (selectedFiles.length > 1) {
        newName += "_" + (index + 1);
      }
    } else if (pattern.pattern === "{random}") {
      newName += Math.random().toString(36).substring(2, 8);
    }

    newName += pattern.suffix || "";
    return newName + ".webp";
  };

  const handleConvert = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsConverting(true);
    setError(null);

    try {
      if (!API_URL || API_URL.length === 0) {
        throw new Error("API URL is not configured");
      }

      const formData = new FormData();

      selectedFiles.forEach((file, index) => {
        const customName = renamePattern
          ? generateFileName(file.name, index, renamePattern)
          : file.name;

        const newFile = new File([file], customName, { type: file.type });
        formData.append("files", newFile);
      });

      formData.append("quality", "85");

      console.log("Sending request to:", API_URL);
      console.log("Hostname:", window.location.hostname);
      console.log(
        "Is production:",
        window.location.hostname !== "localhost" &&
          window.location.hostname !== "127.0.0.1"
      );

      const finalUrl = API_URL;
      if (!finalUrl || !finalUrl.startsWith("http")) {
        throw new Error(`Invalid API URL: ${finalUrl}`);
      }

      console.log("Final API URL:", finalUrl);

      const response = await fetch(finalUrl, {
        method: "POST",
        body: formData,
      });
      console.log("Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ detail: "Conversion failed" }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      const blob = await response.blob();

      if (contentType === "application/zip") {
        const zipUrl = URL.createObjectURL(blob);
        setConvertedFiles([
          {
            name: "WebPify_converted_images.zip",
            size: blob.size,
            url: zipUrl,
            isZip: true,
          },
        ]);
      } else {
        const disposition = response.headers.get("content-disposition");
        let filename = "converted_image.webp";

        if (disposition) {
          const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        const fileUrl = URL.createObjectURL(blob);
        setConvertedFiles([
          {
            name: filename,
            size: blob.size,
            url: fileUrl,
            isZip: false,
          },
        ]);
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err.message || "Failed to convert images. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (index) => {
    if (convertedFiles[index]) {
      const file = convertedFiles[index];
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.click();
    }
  };

  const handleDownloadAllAsZip = async () => {
    if (convertedFiles.length === 1) {
      handleDownload(0);
      return;
    }

    if (convertedFiles[0]?.isZip) {
      handleDownload(0);
      return;
    }

    if (!convertedFiles || convertedFiles.length === 0) return;

    const zip = new JSZip();

    for (let i = 0; i < convertedFiles.length; i++) {
      const file = convertedFiles[i];
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        zip.file(file.name, blob);
      } catch (error) {
        console.error(`Error adding file ${file.name} to zip:`, error);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "WebPify_converted_images.zip";
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 rounded-2xl shadow-xl p-8">
            <FileUpload
              selectedFiles={selectedFiles}
              previewUrls={previewUrls}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              onConvert={handleConvert}
              isConverting={isConverting}
            />

            {selectedFiles.length > 0 && (
              <BatchRename
                onApplyPattern={handleApplyRenamePattern}
                fileCount={selectedFiles.length}
              />
            )}

            <ConversionProgress
              isConverting={isConverting}
              fileCount={selectedFiles.length}
            />

            {error && (
              <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}

            <ConversionResults
              convertedFiles={convertedFiles}
              onDownload={handleDownload}
              onDownloadAllAsZip={handleDownloadAllAsZip}
            />

            <Features />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ConverterPage;
