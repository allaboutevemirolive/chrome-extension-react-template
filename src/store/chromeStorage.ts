// src/store/chromeStorage.ts

import { PromptState } from '../types/prompt';

export const saveToStorage = (state: PromptState) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ promptState: state });
    }
};

export const loadFromStorage = (): Promise<PromptState | undefined> => {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['promptState'], (result) => {
                resolve(result.promptState);
            });
        } else {
            resolve(undefined);
        }
    });
};
