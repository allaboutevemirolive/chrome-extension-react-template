// src/components/QuickAccessToolbar/FavoritePromptItem.tsx
import React from 'react';
import { Prompt } from '../../types/prompt';

interface FavoritePromptItemProps {
    prompt: Prompt;
}

export const FavoritePromptItem: React.FC<FavoritePromptItemProps> = ({ prompt }) => (
    <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">
        {prompt.title}
    </div>
);
