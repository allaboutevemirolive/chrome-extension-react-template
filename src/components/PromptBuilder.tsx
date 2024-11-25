// src/components/PromptBuilder.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../hooks/redux';
import { addPrompt } from '../store/promptSlice';

export const PromptBuilder: React.FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addPrompt({
            id: uuidv4(),
            title,
            content,
            template: content,
            variables: [],
            category,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
        }));
        setTitle('');
        setContent('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Prompt Title"
                className="w-full mb-2 p-2 border rounded"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Prompt Content"
                className="w-full mb-2 p-2 border rounded"
                rows={4}
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full mb-2 p-2 border rounded"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Save Prompt
            </button>
        </form>
    );
};
