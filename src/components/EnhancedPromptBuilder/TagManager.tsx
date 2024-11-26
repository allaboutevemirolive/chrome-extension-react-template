// src/components/EnhancedPromptBuilder/TagManager.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../../types/prompt';
import { PromptFormData } from './EnhancedPromptBuilder.types';

interface Props {
    formData: PromptFormData;
    setFormData: React.Dispatch<React.SetStateAction<PromptFormData>>;
}

export const TagManager: React.FC<Props> = ({ formData, setFormData }) => {
    const [newTagName, setNewTagName] = useState('');

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                    <span
                        key={tag.id}
                        className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm"
                    >
                        {tag.name}
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    tags: formData.tags.filter(t => t.id !== tag.id)
                                });
                            }}
                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    placeholder="Add new tag"
                    className="flex-1 rounded-md border-gray-300 shadow-sm"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (newTagName.trim()) {
                            const newTag: Tag = {
                                id: uuidv4(),
                                name: newTagName.trim()
                            };
                            setFormData({
                                ...formData,
                                tags: [...formData.tags, newTag]
                            });
                            setNewTagName('');
                        }
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Add
                </button>
            </div>
        </div>
    );
};
