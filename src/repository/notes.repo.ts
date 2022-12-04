import { Note } from '../models/note';
import { Repository } from './repo';

const invalidIdError = new Error('Invalid ID');

export class NotesRepo implements Repository<Note> {
    constructor(private url = 'http://localhost:3300/notes/') {
        //
    }

    load(): Promise<Note[]> {
        return fetch(this.url).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
    queryId(id: string): Promise<Note> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        return fetch(this.url + id).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }

    create(payload: Partial<Note>): Promise<Note> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
    update(payload: Partial<Note>) {
        if (!payload.id) return Promise.reject(invalidIdError);
        return fetch(this.url + payload.id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
    delete(id: string): Promise<string> {
        if (!id) return Promise.reject(invalidIdError);
        return fetch(this.url + id, {
            method: 'DELETE',
        }).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return id;
        });
    }
}
