// src/components/QuickAccessToolbar/QuickAccessToolbar.tsx
import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Prompt } from '../../types/prompt';
import { ToolbarToggleButton } from './ToolbarToggleButton';
import { ToolbarSearchInput } from './ToolbarSearchInput';
import { FavoritePromptList } from './FavoritePromptList';

// TODO: Need more refinement.
export const QuickAccessToolbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const favoritePrompts = useAppSelector((state) => {
        const prompts = state.prompts?.prompts || [];
        return prompts.filter((p: Prompt) => p.isFavorite);
    });

    const filteredPrompts = favoritePrompts.filter((prompt) =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleToolbar = () => setIsOpen((prev) => !prev);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="bg-white rounded-lg shadow-lg p-4 mb-2 w-64">
                    <ToolbarSearchInput
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FavoritePromptList prompts={filteredPrompts} />
                </div>
            )}
            <ToolbarToggleButton isOpen={isOpen} onClick={toggleToolbar} />
        </div>
    );
};
