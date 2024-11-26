const extractChatContent = (): string => {
    const chatContainer = document.querySelector('.react-scroll-to-bottom--css-xcjro-1n7m0yu');
    if (!chatContainer) return '';

    const messages = chatContainer.querySelectorAll('[class*="min-h-[20px]"]');
    let markdown = '';

    messages.forEach((message) => {
        const isUser = message.querySelector('[class*="dark:bg-gray-800"]') !== null;
        const content = message.textContent?.trim() || '';
        markdown += `${isUser ? '**User:**' : '**ChatGPT:**'}\n${content}\n\n`;
    });

    return markdown;
};

// Initialize message listener
const initializeContentScript = () => {
    console.log('ChatGPT content script initialized');

    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
        console.log('Received message:', request);

        if (request.action === 'extractChat') {
            const markdown = extractChatContent();
            sendResponse({ content: markdown });
        }
        return true; // Required to use sendResponse asynchronously
    });
};

// Execute initialization
initializeContentScript();

