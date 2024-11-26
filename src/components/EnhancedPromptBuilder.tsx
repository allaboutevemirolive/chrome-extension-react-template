// src/components/EnhancedPromptBuilder.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addPrompt, updatePrompt } from '../store/promptSlice';
import { Prompt, Tag, Folder, Project } from '../types/prompt';

interface Props {
    onClose: () => void;
    editingPrompt?: Prompt;
}

export const EnhancedPromptBuilder: React.FC<Props> = ({ onClose, editingPrompt }) => {
    const dispatch = useAppDispatch();
    const folders = useAppSelector(state => state.prompts.folders);
    const projects = useAppSelector(state => state.prompts.projects);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        folderId: '',
        projectId: '',
        tags: [] as Tag[],
        shortcut: '',
    });

    const [, setSelectedTags] = useState<string[]>([]);
    const [newTagName, setNewTagName] = useState('');

    useEffect(() => {
        if (editingPrompt) {
            setFormData({
                title: editingPrompt.title,
                content: editingPrompt.content,
                category: editingPrompt.category,
                folderId: editingPrompt.folderId || '',
                projectId: editingPrompt.projectId || '',
                tags: editingPrompt.tags,
                shortcut: editingPrompt.shortcut || '',
            });
            setSelectedTags(editingPrompt.tags.map(tag => tag.id));
        }
    }, [editingPrompt]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const promptData: Prompt = {
            id: editingPrompt?.id || uuidv4(),
            title: formData.title.trim(),
            content: formData.content.trim(),
            template: formData.content.trim(),
            variables: [], // You might want to parse variables from content
            category: formData.category.trim(),
            tags: formData.tags,
            folderId: formData.folderId || undefined,
            projectId: formData.projectId || undefined,
            isFavorite: editingPrompt?.isFavorite || false,
            useCount: editingPrompt?.useCount || 0,
            createdAt: editingPrompt?.createdAt || new Date(),
            updatedAt: new Date(),
            version: editingPrompt ? editingPrompt.version + 1 : 1,
            shortcut: formData.shortcut || undefined,
        };

        if (editingPrompt) {
            dispatch(updatePrompt(promptData));
        } else {
            dispatch(addPrompt(promptData));
        }
        onClose();
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
                {editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                {/* Content Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                {/* Organization Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Folder</label>
                        <select
                            value={formData.folderId}
                            onChange={e => setFormData({...formData, folderId: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">No Folder</option>
                            {folders.map((folder: Folder) => (
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Project</label>
                        <select
                            value={formData.projectId}
                            onChange={e => setFormData({...formData, projectId: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">No Project</option>
                            {projects.map((project: Project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tags Section */}
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

                {/* Shortcut Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Keyboard Shortcut
                    </label>
                    <input
                        type="text"
                        value={formData.shortcut}
                        onChange={e => setFormData({...formData, shortcut: e.target.value})}
                        placeholder="e.g., Ctrl+Shift+1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        {editingPrompt ? 'Update' : 'Save'} Prompt
                    </button>
                </div>
            </form>
        </div>
    );
};
