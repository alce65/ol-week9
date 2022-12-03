class NotesRepo {
    url = 'http://localhost:3300/notes/';

    load() {
        // : Promise<Note[]>
        return fetch(this.url).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
    query(id) {
        // : Promise<Note[]>
        return fetch(this.url + id).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }

    create(payload) {
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
    update(payload) {
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
    delete(id) {
        if (!id) throw new Error('Invalid ID');
        return fetch(this.url + id, {
            method: 'DELETE',
        });
        // .then((resp) => {
        //     if (!resp.ok)
        //         throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        //     return resp.json();
        // });
    }
}

const repo = new NotesRepo();
console.log('Load');
repo.load()
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
console.log('Query');
repo.query('1')
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
console.log('Query 6');
repo.query('6')
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
console.log('Create');
repo.create({ title: 'New Note', author: 'Luis' })
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
