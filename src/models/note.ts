// Se puede usar type, interface o class

type NoteType = {
    id: string;
    title: string;
    author: string;
    isImportant: boolean;
};

export class Note implements NoteType {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        crypto.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isImportant: boolean;
    constructor(public title: string, public author: string = '') {
        this.id = Note.generateId();
        this.isImportant = false;
    }
}
