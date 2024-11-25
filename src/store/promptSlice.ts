// src/store/promptSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Prompt, PromptState } from '../types/prompt';

// Initialize state with correct structure
const initialState: PromptState = {
    prompts: [] // Make sure this is an array
};

const promptSlice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        setInitialState: (state, action: PayloadAction<PromptState>) => {
            // Ensure we're setting a valid state structure
            state.prompts = Array.isArray(action.payload.prompts) 
                ? action.payload.prompts 
                : [];
        },
        addPrompt: (state, action: PayloadAction<Prompt>) => {
            // Ensure prompts is an array before pushing
            if (!Array.isArray(state.prompts)) {
                state.prompts = [];
            }
            state.prompts.push(action.payload);
            // Save to Chrome storage
            if (chrome.storage?.local) {
                chrome.storage.local.set({ 
                    promptState: { prompts: state.prompts } 
                });
            }
        },
        deletePrompt: (state, action: PayloadAction<string>) => {
            if (Array.isArray(state.prompts)) {
                state.prompts = state.prompts.filter(prompt => prompt.id !== action.payload);
                // Save to Chrome storage
                if (chrome.storage?.local) {
                    chrome.storage.local.set({ 
                        promptState: { prompts: state.prompts } 
                    });
                }
            }
        }
    }
});

export const { setInitialState, addPrompt, deletePrompt } = promptSlice.actions;
export default promptSlice.reducer;
