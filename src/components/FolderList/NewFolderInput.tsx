// src/components/FolderList/NewFolderInput.tsx
import React from 'react';

interface NewFolderInputProps {
    newFolderName: string;
    onFolderNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateFolder: () => void;
}

export const NewFolderInput: React.FC<NewFolderInputProps> = ({
    newFolderName,
    onFolderNameChange,
    onCreateFolder,
}) => (
    <div className="flex items-center mb-2">
        <input
            type="text"
            value={newFolderName}
            onChange={onFolderNameChange}
            placeholder="New folder name"
            className="flex-1 p-2 border rounded-l"
        />
        <button
            onClick={onCreateFolder}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r"
        >
            Add
        </button>
    </div>
);
