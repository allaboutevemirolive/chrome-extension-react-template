// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
    isAddingPrompt: boolean;
    toggleAddingPrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAddingPrompt, toggleAddingPrompt }) => {
    return (
        <header className="bg-indigo-600 text-white p-4 shadow-lg rounded-t-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wide">Prompt Manager</h1>
                <button
                    onClick={toggleAddingPrompt}
                    className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white transition-transform transform hover:scale-110"
                >
                    {isAddingPrompt ? (
                        <span className="text-2xl font-bold">×</span>
                    ) : (
                        <span className="text-2xl font-bold">+</span>
                    )}
                </button>
            </div>
        </header>
    );
};
