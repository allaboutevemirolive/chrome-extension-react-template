// src/App.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/redux';
import { PromptBuilder } from './components/PromptBuilder';
import { PromptList } from './components/PromptList';
import { setInitialState } from './store/promptSlice';

function App() {
    const dispatch = useAppDispatch();
    const [isAddingPrompt, setIsAddingPrompt] = useState(false);

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.get(['promptState'], (result) => {
                // Initialize with empty prompts array if no data exists
                const initialState = result.promptState || { prompts: [] };
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
                {isAddingPrompt ? (
                    <PromptBuilder onClose={() => setIsAddingPrompt(false)} />
                ) : (
                    <PromptList />
                )}
            </main>
        </div>
    );
}


export default App;
