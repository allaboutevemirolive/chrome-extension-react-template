// src/components/ChatGPTSaver/types.ts
export type SaveFormat = 'html' | 'markdown';

export interface ChatContent {
    content: string;
    type: SaveFormat;
}

export interface ExtractChatContentResponse {
    success: boolean;
    content: string;
    error?: string;
}
