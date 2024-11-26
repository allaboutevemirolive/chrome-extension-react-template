// src/App.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/redux';
import { PromptBuilder } from './components/PromptBuilder';
import { PromptList } from './components/PromptList';
import { setInitialState } from './store/promptSlice';
import { FolderList } from './components/FolderList';
import { QuickAccessToolbar } from './components/QuickAccessToolbar';

function App() {
    const dispatch = useAppDispatch();
    const [isAddingPrompt, setIsAddingPrompt] = useState(false);

    // src/App.tsx
    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.get(['promptState'], (result) => {
                const savedState = result.promptState || {};
                // Ensure the state has the correct structure
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
                        shortcuts: savedState.userPreferences?.shortcuts || {}
                    }
                };
                console.log('Initializing state:', initialState); // Debug log
                dispatch(setInitialState(initialState));
            });
        }
    }, [dispatch]);

    return (
        <div className="w-[400px] h-[600px] flex flex-col bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg">
            <header className="bg-indigo-600 text-white p-4 shadow-lg rounded-t-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide">Prompt Manager</h1>
                    <button
                        onClick={() => setIsAddingPrompt(!isAddingPrompt)}
                        className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white transition-transform transform hover:scale-110"
                    >
                        {isAddingPrompt ? (
                            <span className="text-2xl font-bold">×</span>
                        ) : (
                            <span className="text-2xl font-bold">+</span>
                        )}
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-2">
                <FolderList />
                {isAddingPrompt ? (
                    <PromptBuilder onClose={() => setIsAddingPrompt(false)} />
                ) : (
                    <PromptList />
                )}
            </main>
            <QuickAccessToolbar />
        </div>
    );
}


export default App;
