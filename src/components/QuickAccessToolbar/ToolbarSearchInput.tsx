// src/components/QuickAccessToolbar/ToolbarSearchInput.tsx
import React from 'react';

interface ToolbarSearchInputProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToolbarSearchInput: React.FC<ToolbarSearchInputProps> = ({ searchTerm, onSearchChange }) => (
    <input
        type="search"
        placeholder="Quick search..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full p-2 border rounded mb-2"
    />
);
