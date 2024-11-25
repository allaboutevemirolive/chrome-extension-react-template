// src/components/PromptList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { deletePrompt } from '../store/promptSlice';

export const PromptList: React.FC = () => {
    const prompts = useAppSelector(state => state.prompts.prompts);
    const dispatch = useAppDispatch();

    return (
        <div className="p-4">
            {prompts.map((prompt) => (
                <div
                    key={prompt.id}
                    className="mb-4 p-4 border rounded shadow-sm"
                >
                    <h3 className="font-bold">{prompt.title}</h3>
                    <p className="text-sm text-gray-600">{prompt.category}</p>
                    <p className="mt-2">{prompt.content}</p>
                    <button
                        onClick={() => dispatch(deletePrompt(prompt.id))}
                        className="mt-2 text-red-500"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};
