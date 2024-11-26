// src/components/MainContent.tsx
import React from 'react';
import { PromptList } from './PromptList/PromptList';
import { EnhancedPromptBuilder } from './EnhancedPromptBuilder';

interface MainContentProps {
    isAddingPrompt: boolean;
    closePromptBuilder: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ isAddingPrompt, closePromptBuilder }) => {
    return (
        <main className="flex-1 overflow-y-auto px-4 py-2">
            {isAddingPrompt ? (
                <EnhancedPromptBuilder onClose={closePromptBuilder} /> // Pass onClose here
            ) : (
                <PromptList />
            )}
        </main>
    );
};
