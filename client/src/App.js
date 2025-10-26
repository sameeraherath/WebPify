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

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setConvertedFiles([]);
    }
  };

  const handleFileRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleConvert = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      const converted = selectedFiles.map(file => ({
        name: file.name.replace(/\.[^/.]+$/, '.webp'),
        size: Math.round(file.size * 0.7), // Simulate 30% size reduction
        url: URL.createObjectURL(file)
      }));
      setConvertedFiles(converted);
    }, 2000);
  };

  const handleDownload = (index) => {
    if (convertedFiles[index]) {
      const link = document.createElement('a');
      link.href = convertedFiles[index].url;
      link.download = convertedFiles[index].name;
      link.click();
    }
  };

  const handleDownloadAllAsZip = async () => {
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
