// src/store/promptSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Prompt, PromptState } from '../types/prompt';
import { saveToStorage } from './chromeStorage';

const initialState: PromptState = {
    prompts: []
};

const promptSlice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        setInitialState: (state, action: PayloadAction<PromptState>) => {
            state.prompts = action.payload.prompts;
        },
        addPrompt: (state, action: PayloadAction<Prompt>) => {
            state.prompts.push(action.payload);
            saveToStorage({ prompts: state.prompts });
        },
        deletePrompt: (state, action: PayloadAction<string>) => {
            state.prompts = state.prompts.filter(prompt => prompt.id !== action.payload);
            saveToStorage({ prompts: state.prompts });
        }
    }
});

export const { setInitialState, addPrompt, deletePrompt } = promptSlice.actions;
export default promptSlice.reducer;
