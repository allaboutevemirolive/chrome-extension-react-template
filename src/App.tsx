// src/App.tsx
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { PromptBuilder } from './components/PromptBuilder';
import { PromptList } from './components/PromptList';
import { setInitialState } from './store/promptSlice'; // Import setInitialState

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) { // Check if chrome exists
            chrome.storage.local.get(['promptState'], (result: { promptState?: any }) => { // Type the result
                if (result.promptState) {
                    dispatch(setInitialState(result.promptState));
                }
            });
        }
    }, [dispatch]);
    
    return (
        <div className="w-[400px] h-[600px] overflow-y-auto">
            <header className="bg-blue-500 text-white p-4">
                <h1 className="text-xl font-bold">Smart Prompt Manager</h1>
            </header>
            <PromptBuilder />
            <PromptList />
        </div>
    );
}

export default App;
