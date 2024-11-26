// src/components/EnhancedPromptBuilder/FormActions.tsx
import React from 'react';
import { Prompt } from '../../types/prompt';

interface Props {
    onClose: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    editingPrompt?: Prompt;
}

export const FormActions: React.FC<Props> = ({ onClose, editingPrompt }) => {
    return (
        <div className="flex justify-end gap-2">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                {editingPrompt ? 'Update' : 'Save'} Prompt
            </button>
        </div>
    );
};
