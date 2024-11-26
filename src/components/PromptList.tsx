// src/components/PromptList.tsx
import React, { useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { deletePrompt } from '../store/promptSlice';

export const PromptList: React.FC = () => {
    const prompts = useAppSelector(state => state.prompts?.prompts || []); // Ensure prompts is an array
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Optimization: Calculate once

    const filteredPrompts = useMemo(() => {  // Use useMemo for performance
        if (!lowerCaseSearchTerm) {
            return prompts; // Return all prompts if search is empty
        }

        return prompts.filter(prompt => {
            const lowerCaseTitle = prompt.title.toLowerCase();
            const lowerCaseCategory = prompt.category.toLowerCase();
            return lowerCaseTitle.includes(lowerCaseSearchTerm) || lowerCaseCategory.includes(lowerCaseSearchTerm);
        });
    }, [prompts, lowerCaseSearchTerm]); // Only recalculate when prompts or searchTerm changes

    return (
        <div className="space-y-4">
            <div className="sticky top-0 bg-gray-50 p-2 shadow-sm rounded-md">
                <input
                    type="search"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {filteredPrompts.map((prompt) => (
                <div
                    key={prompt.id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg">{prompt.title}</h3>
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                                {prompt.category}
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch(deletePrompt(prompt.id))}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{prompt.content}</p>
                </div>
            ))}

            {filteredPrompts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No prompts found
                </div>
            )}
        </div>
    );
};

