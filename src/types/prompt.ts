// src/types/prompt.ts

export interface Prompt {
    id: string;
    title: string;
    content: string;
    template: string;
    variables: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export interface PromptState {
    prompts: Prompt[];
}
