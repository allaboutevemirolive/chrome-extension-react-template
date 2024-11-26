import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path'; // Add this import

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/manifest.json',
                    dest: '.',
                }
            ],
        }),
    ],
    build: {
        outDir: 'build',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'), // Use path.resolve instead of resolve
                contentScript: path.resolve(__dirname, 'src/contentScript/chatGPT.ts'),
            },
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
});
