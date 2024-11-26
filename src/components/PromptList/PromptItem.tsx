// src/components/PromptList/PromptItem.tsx
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deletePrompt } from '../../store/promptSlice';
import { Prompt } from '../../types/prompt';

interface PromptItemProps {
    prompt: Prompt;
}

export const PromptItem: React.FC<PromptItemProps> = ({ prompt }) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => dispatch(deletePrompt(prompt.id));

    return (
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
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <p className="mt-2 text-gray-600 text-sm">{prompt.content}</p>
        </div>
    );
};
