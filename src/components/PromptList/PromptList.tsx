// src/components/PromptList/PromptList.tsx
import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { PromptSearchBar } from './PromptSearchBar';
import { PromptItem } from './PromptItem';
import { PromptEmptyState } from './PromptEmptyState';

export const PromptList: React.FC = () => {
    const prompts = useAppSelector((state) => state.prompts?.prompts || []); // Ensure prompts is an array
    const [searchTerm, setSearchTerm] = useState('');

    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Optimization: Calculate once

    const filteredPrompts = useMemo(() => {
        if (!lowerCaseSearchTerm) {
            return prompts; // Return all prompts if search is empty
        }
        return prompts.filter((prompt) => {
            const lowerCaseTitle = prompt.title.toLowerCase();
            const lowerCaseCategory = prompt.category.toLowerCase();
            return (
                lowerCaseTitle.includes(lowerCaseSearchTerm) ||
                lowerCaseCategory.includes(lowerCaseSearchTerm)
            );
        });
    }, [prompts, lowerCaseSearchTerm]); // Only recalculate when prompts or searchTerm changes

    return (
        <div className="space-y-4">
            <PromptSearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredPrompts.map((prompt) => (
                <PromptItem key={prompt.id} prompt={prompt} />
            ))}
            {filteredPrompts.length === 0 && <PromptEmptyState />}
        </div>
    );
};
