// src/components/MainContent.tsx
import React from 'react';
// import { FolderList } from './FolderList/FolderList';
import { PromptBuilder } from './PromptBuilder/PromptBuilder';
import { PromptList } from './PromptList/PromptList';

interface MainContentProps {
    isAddingPrompt: boolean;
    closePromptBuilder: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ isAddingPrompt, closePromptBuilder }) => {
    return (
        <main className="flex-1 overflow-y-auto px-4 py-2">
            
            {/*<FolderList />*/}
            {isAddingPrompt ? (
                <PromptBuilder onClose={closePromptBuilder} />
            ) : (
                <PromptList />
            )}
        </main>
    );
};
