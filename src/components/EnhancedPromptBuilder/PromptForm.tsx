// src/components/EnhancedPromptBuilder/PromptForm.tsx
import React from 'react';
import { Folder, Project } from '../../types/prompt';
import { PromptFormData } from './EnhancedPromptBuilder.types';

interface Props {
    formData: PromptFormData;
    setFormData: React.Dispatch<React.SetStateAction<PromptFormData>>;
    folders: Folder[];
    projects: Project[];
}

export const PromptForm: React.FC<Props> = ({ formData, setFormData, folders, projects }) => {
    return (
        <>
            {/* Basic Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            {/* Content Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
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
                        onChange={e => setFormData({ ...formData, folderId: e.target.value })}
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
                        onChange={e => setFormData({ ...formData, projectId: e.target.value })}
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

            {/* Shortcut Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Keyboard Shortcut
                </label>
                <input
                    type="text"
                    value={formData.shortcut}
                    onChange={e => setFormData({ ...formData, shortcut: e.target.value })}
                    placeholder="e.g., Ctrl+Shift+1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
        </>
    );
};
