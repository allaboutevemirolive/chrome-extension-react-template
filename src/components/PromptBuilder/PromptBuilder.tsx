// src/components/PromptBuilder/PromptBuilder.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../hooks/redux';
import { addPrompt } from '../../store/promptSlice';
import { Prompt } from '../../types/prompt';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { PromptBuilderActions } from './PromptBuilderActions';

interface Props {
    onClose: () => void;
}

export const PromptBuilder: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSave = () => {
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormInput
                    label="Title"
                    value={title}
                    placeholder="Enter prompt title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormTextarea
                    label="Content"
                    value={content}
                    placeholder="Enter prompt content"
                    onChange={(e) => setContent(e.target.value)}
                />
                <FormInput
                    label="Category"
                    value={category}
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <PromptBuilderActions onSave={handleSave} onCancel={onClose} />
            </form>
        </div>
    );
};
