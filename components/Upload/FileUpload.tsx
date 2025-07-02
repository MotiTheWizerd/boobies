import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiUpload, FiX, FiFile, FiFilm, FiImage, FiTrash2 } from 'react-icons/fi';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  files?: File[];
  className?: string;
  onSetDefaultFile?: (file: File) => void;
  defaultFileName?: string;
}

export default function FileUpload({
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/*'],
  maxFileSize = 50, // 50MB default
  files = [],
  className = '',
  onSetDefaultFile,
  defaultFileName,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Generate previews for files
  useEffect(() => {
    // Clean up previous previews
    previews.forEach(preview => URL.revokeObjectURL(preview.url));
    
    // Create new previews
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setPreviews(newPreviews);
    
    // Cleanup function
    return () => {
      newPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [files]);

  const validateFiles = (filesToValidate: File[]): File[] => {
    // Check if adding these files would exceed the max count
    if (files.length + filesToValidate.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return [];
    }

    // Validate each file
    const validFiles = filesToValidate.filter(file => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`File ${file.name} exceeds maximum size of ${maxFileSize}MB`);
        return false;
      }

      // Check file type
      const fileType = file.type.split('/')[0];
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return fileType === type.split('/')[0];
        }
        return type === file.type;
      });

      if (!isAccepted) {
        setError(`File type ${file.type} not allowed`);
        return false;
      }

      return true;
    });

    return validFiles;
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(droppedFiles);
      
      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
    }
  }, [files, maxFiles, maxFileSize, acceptedTypes, onFilesChange]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = validateFiles(selectedFiles);
      
      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [files, maxFiles, maxFileSize, acceptedTypes, onFilesChange]);

  const handleRemoveFile = useCallback((fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    onFilesChange(updatedFiles);
    setError(null);
  }, [files, onFilesChange]);

  const handleClearAll = useCallback(() => {
    onFilesChange([]);
    setError(null);
  }, [onFilesChange]);

  const getFileIcon = (fileType: string) => {
    const type = fileType.split('/')[0];
    switch (type) {
      case 'image':
        return <FiImage className="w-6 h-6" />;
      case 'video':
        return <FiFilm className="w-6 h-6" />;
      default:
        return <FiFile className="w-6 h-6" />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${
          isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FiUpload className="mx-auto h-8 w-8 text-gray-500 dark:text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          גרור קבצים לכאן או לחץ לבחירה
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          עד {maxFiles} קבצים, {maxFileSize}MB לקובץ
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              קבצים שהועלו ({files.length}/{maxFiles})
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-red-500 dark:text-red-400 flex items-center"
            >
              <FiTrash2 className="w-3 h-3 mr-1" />
              נקה הכל
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {previews.map((preview, index) => (
              <div
                key={index}
                className={`relative group rounded-md border overflow-hidden bg-gray-50 dark:bg-gray-800 ${preview.file.name === defaultFileName ? 'border-blue-500 dark:border-blue-400 border-2' : 'border-gray-200 dark:border-gray-700'}`}
              >
                <div className="aspect-square w-full h-24 flex items-center justify-center overflow-hidden">
                  {preview.file.type.startsWith('image/') ? (
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2">
                      {getFileIcon(preview.file.type)}
                      <span className="text-xs mt-1 text-center truncate w-full">
                        {preview.file.name.length > 15
                          ? `${preview.file.name.substring(0, 15)}...`
                          : preview.file.name}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                  {formatFileSize(preview.file.size)}
                </div>
                
                <div className="absolute top-1 right-1 flex space-x-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(preview.file);
                    }}
                    className="bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="הסר קובץ"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                  
                  {onSetDefaultFile && preview.file.name !== defaultFileName && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetDefaultFile(preview.file);
                      }}
                      className="bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="הגדר כברירת מחדל"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {preview.file.name === defaultFileName && (
                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                    ברירת מחדל
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
