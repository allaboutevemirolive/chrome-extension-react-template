export interface Tag {
    id: string;
    name: string;
    color?: string;
}

export interface Folder {
    id: string;
    name: string;
    parentId?: string | null;
    promptIds: string[];
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    promptIds: string[];
}

export interface Prompt {
    id: string;
    title: string;
    content: string;
    template: string;
    variables: string[];
    category: string;
    tags: Tag[];
    folderId?: string;
    projectId?: string;
    isFavorite: boolean;
    useCount: number;
    lastUsed?: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    shortcut?: string;
}

export interface PromptState {
    prompts: Prompt[];
    folders: Folder[];
    projects: Project[];
    tags: Tag[];
    activeFolder: string | null;
    activeProject: string | null;
    recentlyUsed: string[]; // Array of prompt IDs
    userPreferences: {
        toolbarPosition: 'top' | 'bottom' | 'left' | 'right';
        toolbarDisplay: 'favorites' | 'recent' | 'both';
        shortcuts: { [key: string]: string }; // Maps shortcuts to prompt IDs
    };
}
