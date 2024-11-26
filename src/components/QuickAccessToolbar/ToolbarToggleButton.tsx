// src/components/QuickAccessToolbar/ToolbarToggleButton.tsx
import React from 'react';

interface ToolbarToggleButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export const ToolbarToggleButton: React.FC<ToolbarToggleButtonProps> = ({ isOpen, onClick }) => (
    <button
        onClick={onClick}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
    >
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M12 6v6m0 0v6m0-6h6m-6 0H6'}
            />
        </svg>
    </button>
);
