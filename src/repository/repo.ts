export interface Repository<T> {
    load: () => Promise<T[]>;
    // como alternativa, load puede denominarse search
    queryId: (id: string) => Promise<T>;
    // No se incluye una query potencialmente más genérica query: ({ id }: { id: string }) => Promise<T>;
    create: (payload: Partial<T>) => Promise<T>;
    update: (payload: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<string>;
}

export interface SyncRepository<T> {
    // los posibles errores dan una respuesta null, como alternativa a un trow error
    load: () => T[];
    queryId: (id: string) => T | null;
    create: (payload: Partial<T>) => T | null;
    update: (payload: Partial<T>) => T | null;
    delete: (id: string) => string | null;
}

export interface SyncRepositoryWithErrors<T> {
    // los posibles errores dan una respuesta null, como alternativa a un trow error
    load: () => T[];
    queryId: (id: string) => T;
    create: (payload: Partial<T>) => T;
    update: (payload: Partial<T>) => T;
    delete: (id: string) => string;
}
