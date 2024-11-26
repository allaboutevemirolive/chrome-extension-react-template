// src/components/FolderList/FolderItem.tsx
import React from 'react';
import { Folder } from '../../types/prompt';

interface FolderItemProps {
    folder: Folder | null; // `null` for "All Prompts"
    isActive: boolean;
    onClick: () => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`p-2 cursor-pointer rounded ${isActive ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
    >
        {folder ? folder.name : 'All Prompts'}
    </div>
);
