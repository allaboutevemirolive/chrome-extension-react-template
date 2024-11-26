// src/components/MainContent.tsx
import React from 'react';
import { PromptList } from './PromptList/PromptList';
import { EnhancedPromptBuilder } from './EnhancedPromptBuilder';
import { SaveChatButton } from './ChatGPTSaver/SaveChatButton';

interface MainContentProps {
    isAddingPrompt: boolean;
    closePromptBuilder: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ isAddingPrompt, closePromptBuilder }) => {
    return (
        <main className="flex-1 overflow-y-auto px-4 py-2">
            <SaveChatButton />
            {isAddingPrompt ? (
                <EnhancedPromptBuilder onClose={closePromptBuilder} />
            ) : (
                <PromptList />
            )}
        </main>
    );
};
