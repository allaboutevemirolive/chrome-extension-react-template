// src/components/PromptManagerContainer.tsx
import React, { useState } from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';

export const PromptManagerContainer: React.FC = () => {
    const [isAddingPrompt, setIsAddingPrompt] = useState(false);

    const toggleAddingPrompt = () => setIsAddingPrompt((prev) => !prev);
    const closePromptBuilder = () => setIsAddingPrompt(false);

    return (
        <div className="w-[400px] h-[600px] flex flex-col bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg">
            <Header isAddingPrompt={isAddingPrompt} toggleAddingPrompt={toggleAddingPrompt} />
            <MainContent isAddingPrompt={isAddingPrompt} closePromptBuilder={closePromptBuilder} />
        </div>
    );
};
