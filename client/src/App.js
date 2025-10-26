import React, { useState } from 'react';
import JSZip from 'jszip';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ConversionProgress from './components/ConversionProgress';
import ConversionResults from './components/ConversionResults';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/api/convert';

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setConvertedFiles([]);
      setError(null);
    }
  };

  const handleFileRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleConvert = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setIsConverting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Add all files to FormData
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      
      // Add quality parameter
      formData.append('quality', '85');
      
      // Send request to API
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Conversion failed' }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }
      
      // Handle response based on content type
      const contentType = response.headers.get('content-type');
      const blob = await response.blob();
      
      if (contentType === 'application/zip') {
        // Multiple files - create download for ZIP
        const zipUrl = URL.createObjectURL(blob);
        setConvertedFiles([{
          name: 'WebPify_converted_images.zip',
          size: blob.size,
          url: zipUrl,
          isZip: true
        }]);
      } else {
        // Single file - extract filename from Content-Disposition header
        const disposition = response.headers.get('content-disposition');
        let filename = 'converted_image.webp';
        
        if (disposition) {
          const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }
        
        const fileUrl = URL.createObjectURL(blob);
        setConvertedFiles([{
          name: filename,
          size: blob.size,
          url: fileUrl,
          isZip: false
        }]);
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err.message || 'Failed to convert images. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (index) => {
    if (convertedFiles[index]) {
      const file = convertedFiles[index];
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    }
  };

  const handleDownloadAllAsZip = async () => {
    // For single file WebP, just trigger download
    if (convertedFiles.length === 1) {
      handleDownload(0);
      return;
    }
    
    // If we already have a ZIP from the API, just download it
    if (convertedFiles[0]?.isZip) {
      handleDownload(0);
      return;
    }

    // Otherwise create a ZIP from individual files
    if (!convertedFiles || convertedFiles.length === 0) return;

    const zip = new JSZip();
    
    // Fetch each file and add it to the zip
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

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'WebPify_converted_images.zip';
    link.click();
    
    // Clean up
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
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              onConvert={handleConvert}
              isConverting={isConverting}
            />

            <ConversionProgress isConverting={isConverting} fileCount={selectedFiles.length} />

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

export default App;
