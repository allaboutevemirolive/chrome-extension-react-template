import TurndownService from 'turndown';
import { cleanupMarkdown } from './cleanupMarkdown';

export const convertToMarkdown = (html: string): string => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    return cleanupMarkdown(markdown);
};
