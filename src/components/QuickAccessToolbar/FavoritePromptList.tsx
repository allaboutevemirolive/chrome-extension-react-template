// src/components/QuickAccessToolbar/FavoritePromptList.tsx
import React from 'react';
import { Prompt } from '../../types/prompt';
import { FavoritePromptItem } from './FavoritePromptItem';

interface FavoritePromptListProps {
    prompts: Prompt[];
}

export const FavoritePromptList: React.FC<FavoritePromptListProps> = ({ prompts }) => (
    <div className="max-h-48 overflow-y-auto">
        {prompts.map((prompt) => (
            <FavoritePromptItem key={prompt.id} prompt={prompt} />
        ))}
    </div>
);
