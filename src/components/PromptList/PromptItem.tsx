import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deletePrompt } from '../../store/promptSlice';
import { Prompt } from '../../types/prompt';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface PromptItemProps {
    prompt: Prompt;
}

export const PromptItem: React.FC<PromptItemProps> = ({ prompt }) => {
    const dispatch = useAppDispatch();
    const [copied, setCopied] = React.useState(false);

    const handleDelete = () => dispatch(deletePrompt(prompt.id));
    
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            key={prompt.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow relative"
        >
            <div className="absolute top-2 right-2 flex items-center space-x-2">
                <CopyToClipboard text={prompt.content} onCopy={handleCopy}>
                    <button
                        className={`
                            p-1.5 rounded-full focus:outline-none transition-all duration-200
                            ${copied 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                            }
                        `}
                        title={copied ? 'Copied!' : 'Copy Prompt'}
                    >
                        {copied ? (
                            <ClipboardDocumentCheckIcon className="w-5 h-5" />
                        ) : (
                            <ClipboardDocumentIcon className="w-5 h-5" />
                        )}
                        {copied && (
                            <span className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10">
                                Copied!
                            </span>
                        )}
                    </button>
                </CopyToClipboard>
                
                <button
                    onClick={handleDelete}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-red-100 focus:outline-none"
                    title="Delete Prompt"
                >
                    <svg 
                        className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                    </svg>
                </button>
            </div>

            <div className="pr-16"> {/* Add padding to prevent content overlap with buttons */}
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg">{prompt.title}</h3>
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                            {prompt.category}
                        </span>
                    </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{prompt.content}</p>
            </div>
        </div>
    );
};
