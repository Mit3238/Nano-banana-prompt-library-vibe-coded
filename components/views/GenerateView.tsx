import React, { useState } from 'react';
import { generateImage } from '../../services/geminiService';
import { Spinner } from '../Spinner';

export const GenerateView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Image Generation</h1>
      <p className="text-center text-gray-600 mb-8">Create stunning images from your imagination using Imagen 4.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A majestic lion wearing a crown, photorealistic, 4k"
            className="flex-grow bg-gray-100 text-gray-800 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none resize-none min-h-[100px]"
            rows={3}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading && <Spinner size="sm" />}
            <span className={isLoading ? 'ml-2' : ''}>Generate</span>
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      <div className="mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">Generating your masterpiece...</p>
          </div>
        )}
        {generatedImage && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Your Generated Image</h2>
            <img src={generatedImage} alt="Generated" className="rounded-lg w-full max-w-lg mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};