// src/App.tsx
import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { setInitialState } from './store/promptSlice';
import { PromptManagerContainer } from './components/PromptManagerContainer';
import { PromptState } from './types/prompt';

function App() {
    const dispatch = useAppDispatch();
    const promptState = useAppSelector((state) => state.prompts);

    // Debounced save function
    const debouncedSaveState = useCallback(
        debounce((stateToSave: PromptState) => {
            if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                chrome.storage.local.set({ promptState: stateToSave });
            }
        }, 300), // Debounce delay of 300ms
        []
    );

    useEffect(() => {
        const loadState = () => {
            if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                chrome.storage.local.get(['promptState'], (result) => {
                    const savedState = result.promptState || {};
                    const initialState: PromptState = { // Use the type here
                        prompts: Array.isArray(savedState.prompts) ? savedState.prompts : [],
                        folders: Array.isArray(savedState.folders) ? savedState.folders : [],
                        tags: Array.isArray(savedState.tags) ? savedState.tags : [],
                        projects: Array.isArray(savedState.projects) ? savedState.projects : [],
                        activeFolder: savedState.activeFolder || null,
                        activeProject: savedState.activeProject || null,
                        recentlyUsed: Array.isArray(savedState.recentlyUsed) ? savedState.recentlyUsed : [],
                        userPreferences: {
                            toolbarPosition: savedState.userPreferences?.toolbarPosition || 'bottom',
                            toolbarDisplay: savedState.userPreferences?.toolbarDisplay || 'both',
                            shortcuts: savedState.userPreferences?.shortcuts || {},
                        },
                    };
                    dispatch(setInitialState(initialState));
                });
            }
        };

        loadState(); // Load initial state

        // Listen for changes and save the state
    }, [dispatch]);

    useEffect(() => {
        debouncedSaveState(promptState); // Save state on changes
    }, [promptState, debouncedSaveState]);

    return (
        <>
            <PromptManagerContainer />
            {/*<QuickAccessToolbar />*/}
            
        </>
    );
}

export default App;
