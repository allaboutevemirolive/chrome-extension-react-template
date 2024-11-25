// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import promptReducer from './promptSlice';

export const store = configureStore({
    reducer: {
        prompts: promptReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
