/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from '../models/task.js';
import { StoreArray } from '../services/storage.js';
import { SyncRepository } from './repo.js';

export class TaskRepo implements SyncRepository<Task> {
    constructor(
        public service: StoreArray<Task>,
        public storeName: string = 'Tasks'
    ) {}

    load(): Array<Task> {
        return this.service.getStore();
    }
    query({ id }: { id: string }): Task | null {
        const initialData = this.service.getStore();
        const data = initialData.find((item) => item.id === id);
        return data ? data : null;
    }
    create(payload: Partial<Task>): Task | null {
        const previousData = this.service.getStore();
        if (!payload.title) return null;
        payload.responsible = payload.responsible || '';
        const newTask = new Task(payload.title, payload.responsible);
        const allData = [...previousData, newTask];
        this.service.setStore(allData);
        return allData.at(-1) as Task;
    }
    update(payload: Partial<Task>): Task | null {
        if (!payload.id) return null;
        // alternativa throw new Error('Invalid ID');
        const initialData = this.service.getStore();
        const id = this.#validateID(payload.id, initialData);
        if (!id) return null;
        // alternativa throw new Error('Invalid ID');

        let finalItem: Task | null = null;
        const data = initialData.map((item) => {
            if (item.id === id) {
                finalItem = { ...item, ...payload };
                return finalItem;
            }
            return item;
        });
        this.service.setStore(data);
        return finalItem;
    }

    delete(id: string): void {
        const initialData = this.service.getStore();
        const data = initialData.filter((item) => item.id !== id);
        this.service.setStore(data);
    }

    #validateID(id: string, initialData: Array<Task>) {
        if (!id || typeof id !== 'string') return null;
        const result = initialData.find((item) => item.id === id);
        return result ? result.id : null;
    }
}
