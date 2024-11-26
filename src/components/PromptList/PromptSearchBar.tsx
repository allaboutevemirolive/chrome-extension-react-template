// src/components/PromptList/PromptSearchBar.tsx
import React from 'react';

interface PromptSearchBarProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PromptSearchBar: React.FC<PromptSearchBarProps> = ({ searchTerm, onSearchChange }) => (
    <div className="sticky top-0 bg-gray-50 p-2 shadow-sm rounded-md">
        <input
            type="search"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
);
