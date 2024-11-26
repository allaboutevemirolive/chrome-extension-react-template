// src/components/ChatGPTSaver/SaveChatButton.tsx
import React, { useState } from 'react';
import TurndownService from 'turndown';

export const SaveChatButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveFormat, setSaveFormat] = useState<'html' | 'markdown'>('markdown');

    const extractChatContent = async (tabId: number): Promise<string> => {
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
                const selectors = ['.h-full'];

                let chatContainer = null;

                // Find the container
                for (const selector of selectors) {
                    chatContainer = document.querySelector(selector);
                    if (chatContainer && chatContainer.innerHTML.trim()) {
                        break;
                    }
                }

                if (!chatContainer) {
                    console.error('No chat container found');
                    return '';
                }

                // Create a clone of the container to avoid modifying the original DOM
                const cleanContainer = chatContainer.cloneNode(true) as HTMLElement;

                // Remove unwanted elements
                const elementsToRemove = [
                    'script',                    // Remove all script tags
                    // 'style',                     // Remove style tags
                    // '.login-prompt',             // Remove login prompts
                    // '.text-xs',                  // Remove small text (usually disclaimers)
                    // '[aria-label="Action bar"]', // Remove action bars
                    // 'button',                    // Remove buttons
                    // 'form',                      // Remove forms
                    // '#prompt-textarea',          // Remove textarea
                    // '[data-testid="send-button"]', // Remove send button
                    // '.empty\\:hidden',           // Remove hidden elements
                ];

                elementsToRemove.forEach(selector => {
                    cleanContainer.querySelectorAll(selector).forEach(element => {
                        element.remove();
                    });
                });

                // Remove elements with specific text content
                const textToRemove = [
                    'ChatGPT can make mistakes',
                    'Log in',
                    'Create free account',
                    'Messages beyond this point are only visible to you',
                ];

                const walker = document.createTreeWalker(
                    cleanContainer,
                    NodeFilter.SHOW_TEXT,
                    null
                );

                const textsToRemove: Node[] = [];
                let currentNode: Node | null = walker.nextNode();

                while (currentNode) {
                    if (textToRemove.some(text => currentNode?.textContent?.includes(text))) {
                        textsToRemove.push(currentNode);
                    }
                    currentNode = walker.nextNode();
                }

                textsToRemove.forEach(node => {
                    node.parentNode?.removeChild(node);
                });

                // Clean up empty elements
                const removeEmpty = (element: HTMLElement) => {
                    Array.from(element.children).forEach(child => {
                        if (child instanceof HTMLElement) {
                            removeEmpty(child);
                        }
                    });

                    if (
                        element.children.length === 0 &&
                        !element.textContent?.trim() &&
                        element.parentElement &&
                        !['img', 'br', 'hr'].includes(element.tagName.toLowerCase())
                    ) {
                        element.parentElement.removeChild(element);
                    }
                };

                removeEmpty(cleanContainer);

                return cleanContainer.outerHTML;
            }
        });

        return result || '';
    };



    const cleanupMarkdown = (markdown: string): string => {
        // Array of text patterns to remove
        const unwantedPatterns = [
            // Header content
            /ChatGPT 4o mini\n\nLog in\n\nChatGPT 4o mini\n\nLog in\n\nCreate free account\n\n/g,
            /This is a copy of a conversation between ChatGPT & Anonymous\.\n\nReport content\n\n/g,

            // Footer content
            /Messages beyond this point are only visible to you\n\n/g,
            /window\._\_oai_logHTML.*\n/g,
            /ChatGPT can make mistakes\. Check important info\.\n\n\?\n/g,

            // Remove excessive newlines
            /\n{3,}/g,

            // Clean up any remaining UI elements
            /Copy code\n/g,
            /javascript\n\n/g,
            /json\n\n/g,
        ];

        // Apply all cleanup patterns
        let cleanedMarkdown = markdown;
        unwantedPatterns.forEach(pattern => {
            cleanedMarkdown = cleanedMarkdown.replace(pattern, '\n\n');
        });

        // Final cleanup of excessive whitespace
        cleanedMarkdown = cleanedMarkdown
            .split('\n')
            .map(line => line.trim())
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        return cleanedMarkdown;
    };

    const convertToMarkdown = (html: string): string => {
        const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            emDelimiter: '*',
        });

        // Custom rules for ChatGPT-specific content
        turndownService.addRule('chatMessages', {
            filter: (node): boolean => {
                if (!(node instanceof HTMLElement)) {
                    return false;
                }
                const role = node.getAttribute('data-message-author-role');
                return role === 'user' || role === 'assistant';
            },
            replacement: (content, node) => {
                if (!(node instanceof HTMLElement)) {
                    return content;
                }
                const role = node.getAttribute('data-message-author-role');
                const prefix = role === 'user' ? '**User:**' : '**Assistant:**';
                return `${prefix}\n\n${content}\n\n`;
            }
        });

        // Convert to markdown and clean it up
        const markdown = turndownService.turndown(html);
        return cleanupMarkdown(markdown);
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab.id) {
                throw new Error('No active tab found');
            }

            const content = await extractChatContent(tab.id);

            if (!content) {
                throw new Error('No chat content found on the page');
            }

            let fileContent: string;
            let fileType: string;
            let fileExtension: string;

            if (saveFormat === 'markdown') {
                fileContent = convertToMarkdown(content);
                fileType = 'text/markdown';
                fileExtension = 'md';
            } else {
                fileContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>ChatGPT Conversation</title>
                        <style>
                            body {
                                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                                line-height: 1.6;
                                padding: 20px;
                                max-width: 800px;
                                margin: 0 auto;
                                color: #374151;
                            }
                            .chat-message {
                                margin-bottom: 1.5rem;
                                padding: 1rem;
                                border-radius: 0.5rem;
                            }
                            .user-message {
                                background-color: #f3f4f6;
                            }
                            .assistant-message {
                                background-color: #ffffff;
                                border: 1px solid #e5e7eb;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="chat-container">
                            ${content}
                        </div>
                    </body>
                    </html>
                `;
                fileType = 'text/html';
                fileExtension = 'html';
            }

            const blob = new Blob([fileContent], { type: fileType });
            const url = URL.createObjectURL(blob);

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `chatgpt-conversation-${timestamp}.${fileExtension}`;

            await chrome.downloads.download({
                url: url,
                filename: filename,
                saveAs: true
            });

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Save failed:', err);
            setError(err instanceof Error ? err.message : 'Failed to save chat');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <button
                    onClick={() => setSaveFormat('markdown')}
                    className={`px-3 py-1 rounded-md text-sm ${saveFormat === 'markdown'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Markdown
                </button>
                <button
                    onClick={() => setSaveFormat('html')}
                    className={`px-3 py-1 rounded-md text-sm ${saveFormat === 'html'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    HTML
                </button>
            </div>
            <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md transition-colors ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
            >
                {isLoading ? 'Saving...' : `Save Chat as ${saveFormat.toUpperCase()}`}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
};
