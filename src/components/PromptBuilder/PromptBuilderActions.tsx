// src/components/PromptBuilder/PromptBuilderActions.tsx
import React from 'react';

interface PromptBuilderActionsProps {
    onSave: () => void;
    onCancel: () => void;
}

export const PromptBuilderActions: React.FC<PromptBuilderActionsProps> = ({ onSave, onCancel }) => (
    <div className="flex space-x-2">
        <button
            type="button"
            onClick={onSave}
            className="flex-1 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
            Save Prompt
        </button>
        <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition-transform transform hover:scale-105"
        >
            Cancel
        </button>
    </div>
);
