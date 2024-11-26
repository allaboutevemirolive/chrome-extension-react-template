// src/components/EnhancedPromptBuilder/EnhancedPromptBuilder.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Prompt } from '../../types/prompt';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPrompt } from '../../store/promptSlice';
import { PromptForm } from './PromptForm';
import { TagManager } from './TagManager';
import { FormActions } from './FormActions';
import { EnhancedPromptBuilderProps, PromptFormData } from './EnhancedPromptBuilder.types';

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
            variables: [],
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
            onUpdate(promptData);
        } else {
            dispatch(addPrompt(promptData));
            onClose();
        }
    };

    return (
        <Transition.Root show={true} as={React.Fragment}>
            <Dialog
                as={motion.div}
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={onClose}
                static
            >
                 <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                                    {editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
                                </Dialog.Title>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
