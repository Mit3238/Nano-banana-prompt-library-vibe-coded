import React, { useState, useCallback } from 'react';
import { editImage } from '../../services/geminiService';
import { ImageUploader } from '../ImageUploader';
import { Spinner } from '../Spinner';
import { PROMPTS, CATEGORIES } from '../../constants';
import type { UploadedImage, Category, PromptExample } from '../../types';

const PromptCard: React.FC<{ example: PromptExample; onSelect: (prompt: string) => void }> = ({ example, onSelect }) => (
    <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden group cursor-pointer" onClick={() => onSelect(example.prompt)}>
        <img src={example.imageUrl} alt={example.prompt} className="w-full h-32 object-cover" />
        <div className="p-3">
            <p className="text-sm text-gray-600 group-hover:text-cyan-600 transition-colors">{example.prompt}</p>
        </div>
    </div>
);

const CategoryPills: React.FC<{ activeCategory: Category; onSelectCategory: (category: Category) => void }> = ({ activeCategory, onSelectCategory }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map(cat => (
            <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeCategory === cat ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                {cat}
            </button>
        ))}
    </div>
);

export const EditView: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('Other');

    const handleImageUpload = useCallback((image: UploadedImage) => {
        setUploadedImage(image);
        setEditedImage(null);
    }, []);
    
    const handlePromptSelect = (selectedPrompt: string) => {
        setPrompt(selectedPrompt);
    };

    const handleEdit = async () => {
        if (!uploadedImage) {
            setError("Please upload an image first.");
            return;
        }
        if (!prompt.trim()) {
            setError("Please enter or select a prompt.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const resultUrl = await editImage(prompt, { base64: uploadedImage.base64, mimeType: uploadedImage.mimeType });
            setEditedImage(resultUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during editing.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Editor</h1>
                <p className="text-gray-600">Upload your photo and use Nano-Banana to edit it with simple text prompts.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left/Top Column: Controls */}
                <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">1. Upload Image</h2>
                        <ImageUploader onImageUpload={handleImageUpload} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">2. Choose an Edit</h2>
                        <CategoryPills activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
                           {PROMPTS[activeCategory].map((p, index) => (
                                <PromptCard key={index} example={p} onSelect={handlePromptSelect} />
                            ))}
                        </div>
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold mb-3">3. Refine or Create Prompt</h2>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Or write your own prompt here..."
                            className="w-full bg-gray-100 text-gray-800 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none"
                            rows={3}
                        />
                    </div>
                    <div>
                         <button
                            onClick={handleEdit}
                            disabled={isLoading || !uploadedImage}
                            className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                        >
                            {isLoading && <Spinner size="sm" />}
                            <span className={isLoading ? 'ml-2' : ''}>Apply Edit</span>
                        </button>
                    </div>
                     {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
                
                {/* Right/Bottom Column: Results */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-700 mb-2">Original</h3>
                            {uploadedImage ? <img src={uploadedImage.url} alt="Original" className="rounded-lg w-full aspect-square object-contain bg-gray-200" /> : <div className="rounded-lg w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-500">Your image here</div>}
                        </div>
                        <div className="text-center">
                             <h3 className="font-semibold text-gray-700 mb-2">Edited</h3>
                             {isLoading ? <div className="rounded-lg w-full aspect-square bg-gray-200 flex flex-col items-center justify-center text-gray-500"><Spinner /><p className="mt-2">Editing...</p></div> : editedImage ? <img src={editedImage} alt="Edited" className="rounded-lg w-full aspect-square object-contain bg-gray-200" /> : <div className="rounded-lg w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-500">Your result here</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};