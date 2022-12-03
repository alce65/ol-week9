export interface Repository<T> {
    // search: () => Promise<T[]>;
    load: () => Promise<T[]>;
    query: ({ id }: { id: string }) => Promise<T>;
    create: (item: T) => Promise<void>;
    update: (payload: Partial<T>) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

export interface SyncRepository<T> {
    // search: () => T[];
    load: () => T[];
    query: ({ id }: { id: string }) => T | null;
    create: (item: T) => T | null;
    update: (payload: Partial<T>) => T | null;
    delete: (id: string) => void;
}
