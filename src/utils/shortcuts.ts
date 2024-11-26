// src/utils/shortcuts.ts
export const registerShortcut = (shortcut: string, callback: () => void) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        const keys = shortcut.toLowerCase().split('+');
        const pressedKey = event.key.toLowerCase();

        const modifiers = {
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            alt: event.altKey,
            meta: event.metaKey,
        };

        const requiredModifiers = {
            ctrl: keys.includes('ctrl'),
            shift: keys.includes('shift'),
            alt: keys.includes('alt'),
            meta: keys.includes('meta'),
        };

        if (
            keys.includes(pressedKey) &&
            modifiers.ctrl === requiredModifiers.ctrl &&
            modifiers.shift === requiredModifiers.shift &&
            modifiers.alt === requiredModifiers.alt &&
            modifiers.meta === requiredModifiers.meta
        ) {
            event.preventDefault();
            callback();
        }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
};
