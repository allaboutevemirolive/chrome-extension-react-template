export const extractChatContent = async (tabId: number): Promise<string> => {
    const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
            const containers = [
                // document.querySelector('.h-full'),
                document.querySelector('div[slot="content"]'),
            ].filter(Boolean); // Filter out null elements

            if (containers.length === 0) return '';

            // Ensure no null values and concatenate outerHTML
            return containers
                .map(container => container ? container.outerHTML : '')
                .join('\n');
        },
    });
    return result || '';
};
