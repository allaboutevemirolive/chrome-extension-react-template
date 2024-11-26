// src/hooks/useShortcuts.ts
import { useEffect } from 'react';
import { useAppSelector } from './redux';
import { registerShortcut } from '../utils/shortcuts';
import { Prompt } from '../types/prompt';

export const useShortcuts = () => {
    const prompts = useAppSelector(state => state.prompts.prompts);
    const shortcuts = useAppSelector(state => state.prompts.userPreferences.shortcuts);

    useEffect(() => {
        const cleanupFns = Object.entries(shortcuts).map(([shortcut, promptId]) => {
            const prompt = prompts.find((p: Prompt) => p.id === promptId);
            if (prompt) {
                return registerShortcut(shortcut, () => {
                    navigator.clipboard.writeText(prompt.content);
                });
            }
            return () => {};
        });

        return () => cleanupFns.forEach(cleanup => cleanup());
    }, [prompts, shortcuts]);
};
