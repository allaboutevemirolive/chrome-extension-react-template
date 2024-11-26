// src/components/QuickAccessToolbar.tsx
import React, { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { Prompt } from '../types/prompt';

export const QuickAccessToolbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const favoritePrompts = useAppSelector(state => {
        const prompts = state.prompts?.prompts;
        if (!Array.isArray(prompts)) {
            return [];
        }
        return prompts.filter((p: Prompt) => p.isFavorite);
    });

    // const filteredPrompts = searchTerm
    //     ? favoritePrompts.filter(p =>
    //         p.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //     : favoritePrompts;

    const toggleToolbar = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="bg-white rounded-lg shadow-lg p-4 mb-2 w-64">
                    <input
                        type="search"
                        placeholder="Quick search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {favoritePrompts.map((prompt: Prompt) => (
                            <div
                                key={prompt.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                            >
                                {prompt.title}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={toggleToolbar}
                className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    );
};
