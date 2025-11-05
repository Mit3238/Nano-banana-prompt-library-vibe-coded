import React, { useState, useCallback } from 'react';
import { analyzeImage } from '../../services/geminiService';
import { ImageUploader } from '../ImageUploader';
import { Spinner } from '../Spinner';
import type { UploadedImage } from '../../types';

export const AnalyzeView: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (image: UploadedImage) => {
    setUploadedImage(image);
    setAnalysis(null);
    setError(null);
    setIsLoading(true);

    try {
      const result = await analyzeImage({ base64: image.base64, mimeType: image.mimeType });
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Image Analysis</h1>
      <p className="text-center text-gray-600 mb-8">Upload a photo to get a detailed description from Gemini.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ImageUploader onImageUpload={handleImageUpload} title="Upload Image to Analyze" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Analysis Results</h2>
          <div className="bg-gray-100 rounded-lg p-4 min-h-[200px] prose prose-p:text-gray-700">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner />
                <p className="mt-2 text-gray-600">Analyzing image...</p>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {analysis ? (
              <p>{analysis}</p>
            ) : (
              !isLoading && <p className="text-gray-500">Analysis will appear here once you upload an image.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};