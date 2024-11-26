import { defineConfig } from 'vite';
import path from 'path'; // Add this import

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: path.resolve(__dirname, 'src/contentScript/chatGPT.ts'), // Use path.resolve
            name: 'ContentScript',
            fileName: 'contentScript',
            formats: ['iife'],
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
});
