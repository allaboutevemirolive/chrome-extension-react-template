// src/App.tsx
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { setInitialState } from './store/promptSlice';
import { PromptManagerContainer } from './components/PromptManagerContainer';
import { QuickAccessToolbar } from './components/QuickAccessToolbar/QuickAccessToolbar';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.get(['promptState'], (result) => {
                const savedState = result.promptState || {};
                const initialState = {
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
    }, [dispatch]);

    return (
        <>
            <PromptManagerContainer />
            <QuickAccessToolbar />
        </>
    );
}

export default App;
