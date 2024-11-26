// src/components/FolderList/FolderListItems.tsx
import React from 'react';
import { Folder } from '../../types/prompt';
import { FolderItem } from './FolderItem';

interface FolderListItemsProps {
    folders: Folder[];
    activeFolder: string | null;
    onFolderSelect: (folderId: string | null) => void;
}

export const FolderListItems: React.FC<FolderListItemsProps> = ({
    folders,
    activeFolder,
    onFolderSelect,
}) => (
    <div className="space-y-1">
        <FolderItem
            folder={null}
            isActive={activeFolder === null}
            onClick={() => onFolderSelect(null)}
        />
        {folders.map((folder) => (
            <FolderItem
                key={folder.id}
                folder={folder}
                isActive={activeFolder === folder.id}
                onClick={() => onFolderSelect(folder.id)}
            />
        ))}
    </div>
);
