// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import promptReducer from './promptSlice';
import { PromptState } from '../types/prompt';

export interface RootState {
    prompts: PromptState;
}

export const store = configureStore({
    reducer: {
        prompts: promptReducer
    }
});

export type AppDispatch = typeof store.dispatch;
