// src/store/promptSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder, Prompt, PromptState } from '../types/prompt';
import { saveToStorage } from './chromeStorage';

const initialState: PromptState = {
    prompts: [],
    folders: [],
    tags: [],
    projects: [],
    activeFolder: null,
    activeProject: null,
    recentlyUsed: [],
    userPreferences: {
        toolbarPosition: 'bottom',
        toolbarDisplay: 'both',
        shortcuts: {}
    }
};

const promptSlice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        setInitialState: (_state, action: PayloadAction<Partial<PromptState>>) => {
            // Merge the incoming state with the initial state structure
            console.log('Setting initial state:', action.payload); // Debug log
            return {
                ...initialState,
                ...action.payload,
                prompts: action.payload.prompts || [],
                folders: action.payload.folders || [],
                tags: action.payload.tags || [],
                projects: action.payload.projects || [],
                userPreferences: {
                    ...initialState.userPreferences,
                    ...(action.payload.userPreferences || {})
                }
            };
        },
        addPrompt: (state, action: PayloadAction<Prompt>) => {
            console.log('Adding prompt:', action.payload); // Debug log
            if (!Array.isArray(state.prompts)) {
                state.prompts = [];
            }
            state.prompts.push(action.payload);
        },
        updatePrompt: (state, action: PayloadAction<Prompt>) => {
            const index = state.prompts.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.prompts[index] = action.payload;
                saveToStorage(state);
            }
        },
        deletePrompt: (state, action: PayloadAction<string>) => {
            state.prompts = state.prompts.filter(prompt => prompt.id !== action.payload);
            saveToStorage(state);
        },
        createFolder: (state, action: PayloadAction<Folder>) => {
            state.folders.push(action.payload);
            saveToStorage(state);
        },
        setActiveFolder: (state, action: PayloadAction<string | null>) => {
            state.activeFolder = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const prompt = state.prompts.find(p => p.id === action.payload);
            if (prompt) {
                prompt.isFavorite = !prompt.isFavorite;
                saveToStorage(state);
            }
        },
        incrementUseCount: (state, action: PayloadAction<string>) => {
            const prompt = state.prompts.find(p => p.id === action.payload);
            if (prompt) {
                prompt.useCount = (prompt.useCount || 0) + 1;
                prompt.lastUsed = new Date();
                saveToStorage(state);
            }
        }
    }
});

export const {
    setInitialState,
    addPrompt,
    updatePrompt,
    deletePrompt,
    createFolder,
    setActiveFolder,
    toggleFavorite,
    incrementUseCount
} = promptSlice.actions;

export default promptSlice.reducer;
