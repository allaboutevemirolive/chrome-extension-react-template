// src/components/EnhancedPromptBuilder/EnhancedPromptBuilder.types.ts
import { Prompt } from '../../types/prompt';

export interface PromptFormData {
    title: string;
    content: string;
    category: string;
    folderId: string;
    projectId: string;
    tags: { id: string; name: string }[];
    shortcut: string;
}

export interface EnhancedPromptBuilderProps {
    onClose: () => void;
    editingPrompt?: Prompt;
    onUpdate?: (updatedPrompt: Prompt) => void; // Add onUpdate prop here
}
