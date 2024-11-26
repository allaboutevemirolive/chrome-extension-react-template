// src/components/FolderList/FolderList.tsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { createFolder, setActiveFolder } from '../../store/promptSlice';
import { v4 as uuidv4 } from 'uuid';
import { NewFolderInput } from './NewFolderInput';
import { FolderListItems } from './FolderListItems';

export const FolderList: React.FC = () => {
    const dispatch = useAppDispatch();
    const folders = useAppSelector((state) => state.prompts?.folders || []);
    const activeFolder = useAppSelector((state) => state.prompts?.activeFolder);
    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            dispatch(
                createFolder({
                    id: uuidv4(),
                    name: newFolderName.trim(),
                    promptIds: [],
                })
            );
            setNewFolderName('');
        }
    };

    const handleFolderSelect = (folderId: string | null) => {
        dispatch(setActiveFolder(folderId));
    };

    return (
        <div className="mb-4">
            <NewFolderInput
                newFolderName={newFolderName}
                onFolderNameChange={(e) => setNewFolderName(e.target.value)}
                onCreateFolder={handleCreateFolder}
            />
            <FolderListItems
                folders={folders}
                activeFolder={activeFolder}
                onFolderSelect={handleFolderSelect}
            />
        </div>
    );
};
