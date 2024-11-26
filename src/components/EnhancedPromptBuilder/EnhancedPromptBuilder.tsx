// src/components/EnhancedPromptBuilder/EnhancedPromptBuilder.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Prompt } from '../../types/prompt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPrompt } from '../../store/promptSlice';
import { PromptForm } from './PromptForm';
import { TagManager } from './TagManager';
import { FormActions } from './FormActions';
import { EnhancedPromptBuilderProps, PromptFormData } from './EnhancedPromptBuilder.types';

// TODO: See `PromptBuilder` component.
export const EnhancedPromptBuilder: React.FC<EnhancedPromptBuilderProps> = ({ onClose, editingPrompt, onUpdate }) => {
    const dispatch = useAppDispatch();
    const folders = useAppSelector(state => state.prompts.folders);
    const projects = useAppSelector(state => state.prompts.projects);

    const [formData, setFormData] = useState<PromptFormData>({
        title: '',
        content: '',
        category: '',
        folderId: '',
        projectId: '',
        tags: [],
        shortcut: '',
    });

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

        if (editingPrompt && onUpdate) {
            onUpdate(promptData); // Call onUpdate to handle saving in PromptItem
        } else {
            dispatch(addPrompt(promptData));
            onClose(); // Close only when adding a new prompt
        }
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
                {editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PromptForm
                    formData={formData}
                    setFormData={setFormData}
                    folders={folders}
                    projects={projects}
                />

                <TagManager
                    formData={formData}
                    setFormData={setFormData}
                />

                <FormActions
                    onClose={onClose}
                    handleSubmit={handleSubmit}
                    editingPrompt={editingPrompt}
                />
            </form>
        </div>
    );
};;
