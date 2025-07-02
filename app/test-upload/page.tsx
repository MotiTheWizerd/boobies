'use client';

import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/Upload/FileUpload';

export default function TestUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [selectedAdId, setSelectedAdId] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch ads for the dropdown
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/ads');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
          if (data.length > 0) {
            setSelectedAdId(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleAdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdId(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedAdId) {
      setUploadStatus('Please select an ad');
      return;
    }

    if (files.length === 0) {
      setUploadStatus('Please select files to upload');
      return;
    }

    setIsLoading(true);
    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`/api/ads/${selectedAdId}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus(`Upload successful! ${files.length} files uploaded.`);
        // Clear files after successful upload
        setFiles([]);
      } else {
        setUploadStatus(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Upload failed due to an error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Test File Upload</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Ad:</label>
        <select 
          value={selectedAdId} 
          onChange={handleAdChange}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="">-- Select an Ad --</option>
          {ads.map(ad => (
            <option key={ad.id} value={ad.id}>
              {ad.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <FileUpload
          onFilesChange={handleFilesChange}
          maxFiles={10}
          acceptedTypes={["image/*", "video/*"]}
          maxFileSize={50}
          files={files}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          disabled={isLoading || !selectedAdId || files.length === 0}
          className={`px-6 py-2 rounded-md ${
            isLoading || !selectedAdId || files.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium transition-colors`}
        >
          {isLoading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>
      
      {uploadStatus && (
        <div className={`mt-4 p-3 rounded-md text-center ${
          uploadStatus.includes('successful') 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : uploadStatus === 'Uploading...'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {uploadStatus}
        </div>
      )}
    </div>
  );
}
