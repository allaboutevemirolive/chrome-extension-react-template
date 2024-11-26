// src/components/EnhancedPromptBuilder/PromptForm.tsx
import React from 'react';
import { Folder, Project } from '../../types/prompt';
import { PromptFormData } from './EnhancedPromptBuilder.types';
import { DocumentTextIcon, FolderIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

interface Props {
    formData: PromptFormData;
    setFormData: React.Dispatch<React.SetStateAction<PromptFormData>>;
    folders: Folder[];
    projects: Project[];
}

export const PromptForm: React.FC<Props> = ({ formData, setFormData, folders, projects }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        id="title" // Added for accessibility
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter prompt title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <div className="relative">
                        <DocumentTextIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" /> {/* Added pointer-events-none */}
                        <textarea
                            id="content" // Added for accessibility
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            rows={6}
                            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Enter prompt content"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="folder" className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                        <div className="relative">
                            <FolderIcon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400 pointer-events-none" /> {/* Added pointer-events-none */}
                            <select
                                id="folder" // Added for accessibility
                                value={formData.folderId}
                                onChange={e => setFormData({ ...formData, folderId: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none" // Added appearance-none
                            >
                                <option value="">No Folder</option>
                                {folders.map((folder) => (
                                    <option key={folder.id} value={folder.id}>
                                        {folder.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div> {/* Project select */}
                        <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                        <div className="relative">
                            <PresentationChartLineIcon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400 pointer-events-none" /> {/* Added pointer-events-none */}
                            <select
                                id="project" // Added for accessibility
                                value={formData.projectId}
                                onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none" // Added appearance-none
                            >
                                <option value="">No Project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>


                {/* Shortcut Field */}
                <div>
                    <label htmlFor="shortcut" className="block text-sm font-medium text-gray-700">
                        Keyboard Shortcut
                    </label>
                    <input
                        id="shortcut" // Added for accessibility
                        type="text"
                        value={formData.shortcut}
                        onChange={e => setFormData({ ...formData, shortcut: e.target.value })}
                        placeholder="e.g., Ctrl+Shift+1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" // Updated className for consistency
                    />
                </div>
            </div>
        </div>
    );
};
