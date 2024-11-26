export const cleanupMarkdown = (markdown: string): string => {
    const patterns = [
        /ChatGPT can make mistakes/g,
        /\n{3,}/g, // Excessive newlines
    ];

    return patterns.reduce((cleaned, pattern) => cleaned.replace(pattern, '\n\n'), markdown).trim();
};
