// src/components/FolderList.tsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { createFolder, setActiveFolder } from '../store/promptSlice';
import { v4 as uuidv4 } from 'uuid';
import { Folder } from '../types/prompt';

export const FolderList: React.FC = () => {
    const dispatch = useAppDispatch();
    const folders = useAppSelector(state => state.prompts?.folders || []);
    const activeFolder = useAppSelector(state => state.prompts?.activeFolder);
    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            dispatch(createFolder({
                id: uuidv4(),
                name: newFolderName.trim(),
                promptIds: []
            }));
            setNewFolderName('');
        }
    };

    return (
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder name"
                    className="flex-1 p-2 border rounded-l"
                />
                <button
                    onClick={handleCreateFolder}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-r"
                >
                    Add
                </button>
            </div>
            <div className="space-y-1">
                <div
                    onClick={() => dispatch(setActiveFolder(null))}
                    className={`p-2 cursor-pointer rounded ${!activeFolder ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
                >
                    All Prompts
                </div>
                {folders.map((folder: Folder) => (
                    <div
                        key={folder.id}
                        onClick={() => dispatch(setActiveFolder(folder.id))}
                        className={`p-2 cursor-pointer rounded ${activeFolder === folder.id ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
                    >
                        {folder.name}
                    </div>
                ))}
            </div>
        </div>
    );
};
