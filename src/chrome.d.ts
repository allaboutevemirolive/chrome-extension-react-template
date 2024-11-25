// src/chrome.d.ts
declare namespace chrome {
    namespace storage {
        namespace local {
            function get(keys: string | string[] | null | undefined, callback: (items: { [key: string]: any; }) => void): void;
            function set(items: { [key: string]: any; }, callback?: () => void): void;
        }
    }
}
