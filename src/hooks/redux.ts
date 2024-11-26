// src/hooks/redux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { PromptState } from '../types/prompt';
import type { AppDispatch } from '../store/store';

interface RootState {
    prompts: PromptState;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
