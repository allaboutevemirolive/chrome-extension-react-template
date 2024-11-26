// src/components/EnhancedPromptBuilder/EnhancedPromptBuilder.types.ts
import { Prompt, Tag } from '../../types/prompt';

export interface EnhancedPromptBuilderProps {
    onClose: () => void;
    editingPrompt?: Prompt;
}

export interface PromptFormData {
    title: string;
    content: string;
    category: string;
    folderId: string;
    projectId: string;
    tags: Tag[];
    shortcut: string;
}
