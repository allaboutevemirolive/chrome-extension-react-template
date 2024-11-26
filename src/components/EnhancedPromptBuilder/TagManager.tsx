// src/components/EnhancedPromptBuilder/TagManager.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../../types/prompt';
import { PromptFormData } from './EnhancedPromptBuilder.types';
import { PlusIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';


interface Props {
    formData: PromptFormData;
    setFormData: React.Dispatch<React.SetStateAction<PromptFormData>>;
}

export const TagManager: React.FC<Props> = ({ formData, setFormData }) => {
    const [newTagName, setNewTagName] = useState('');

    const handleAddTag = () => {
        if (newTagName.trim()) {
            const newTag: Tag = {
                id: uuidv4(),
                name: newTagName.trim(),
            };
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag],
            });
            setNewTagName('');
        }
    };

    const handleRemoveTag = (tagId: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t.id !== tagId),
        });
    };


    return (
        <div className="space-y-3">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label> {/* Added 'for' attribute */}
            <div id="tags" className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border border-gray-300 rounded-lg"> {/* Added 'id' attribute */}
                {formData.tags.map((tag) => (
                    <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium transition-all hover:bg-indigo-200"
                    >
                        <TagIcon className="h-4 w-4 mr-1" />
                        {tag.name}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag.id)}
                            className="ml-1.5 h-4 w-4 rounded-full hover:bg-indigo-300 flex items-center justify-center"
                        >
                            <XMarkIcon className="h-3 w-3" /> {/* Replaced '×' with XMarkIcon */}
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="Add new tag"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                    <TagIcon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400 pointer-events-none" /> {/* Added pointer-events-none */}
                </div>
                <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add
                </button>
            </div>
        </div>
    );
};
