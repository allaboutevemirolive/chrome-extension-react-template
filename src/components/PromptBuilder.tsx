// src/components/PromptBuilder.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../hooks/redux';
import { addPrompt } from '../store/promptSlice';
import { Prompt } from '../types/prompt';

interface Props {
    onClose: () => void;
}

export const PromptBuilder: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newPrompt: Prompt = {
            id: uuidv4(),
            title: title.trim(),
            content: content.trim(),
            template: content.trim(),
            variables: [],
            category: category.trim(),
            tags: [],
            isFavorite: false,
            useCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
        };

        dispatch(addPrompt(newPrompt));
        onClose();
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Create New Prompt</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter prompt title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows={4}
                        placeholder="Enter prompt content"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter category"
                    />
                </div>

                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Save Prompt
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition-transform transform hover:scale-105"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

