import React, { useState, useCallback, useRef } from 'react';
import type { UploadedImage } from '../types';

interface ImageUploaderProps {
  onImageUpload: (image: UploadedImage) => void;
  title?: string;
}

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string; url: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve({ base64: base64String, mimeType: file.type, url: result });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, title = "Upload an Image" }) => {
  const [dragOver, setDragOver] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const imageData = await fileToBase64(file);
        setImageUrl(imageData.url);
        onImageUpload(imageData);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        alert("There was an error processing your image.");
      }
    }
  }, [onImageUpload]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300
        ${dragOver ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-gray-400'}
        ${imageUrl ? 'border-solid' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imageUrl ? (
        <div className="relative group">
          <img src={imageUrl} alt="Uploaded preview" className="mx-auto max-h-64 rounded-lg object-contain" />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <button
              onClick={onButtonClick}
              className="bg-white text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition-colors"
            >
              Change Image
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><path d="M5 17l3-3a2 2 0 0 1 3 0l4 4"/></svg>
          </div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-gray-500">Drag & drop files here or</p>
          <button
            onClick={onButtonClick}
            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Browse Files
          </button>
        </div>
      )}
    </div>
  );
};