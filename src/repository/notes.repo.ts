import { Note } from '../models/note';

export class NotesRepo {
    url = 'http://localhost:3300/notes/';

    load() {
        // : Promise<Note[]>
        return fetch(this.url).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
    query(id: string) {
        // : Promise<Note[]>
        return fetch(this.url + id).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }

    create(payload: Partial<Note>) {
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
        if (!payload.id) throw new Error('Invalid ID');
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
    delete(id: string) {
        if (!id) throw new Error('Invalid ID');
        return fetch(this.url + id, {
            method: 'DELETE',
        }).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return id;
        });
    }
}
