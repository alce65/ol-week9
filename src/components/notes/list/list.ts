import { initializeNotes } from '../../../mocks/notes.js';
import { Note } from '../../../models/note.js';
import { StoreArray } from '../../../services/storage.js';
import { consoleDebug } from '../../../tools/debug.js';
import { Component } from '../../component/component.js';
import { Add } from '../add/add.js';
import { Item } from '../item/item.js';

export class List extends Component {
    notes: Array<Note>;
    srvStore = new StoreArray<Note>('Notes');
    constructor(private selector: string) {
        super();
        this.notes = this.loadNotes();
        this.manageComponent();
    }

    manageComponent() {
        consoleDebug(this.notes);
        this.template = this.createTemplate();
        this.render();
        try {
            new Add('section.notes', this.addNote.bind(this));
            this.notes.forEach(
                (item) =>
                    new Item(
                        'ul.slot-items',
                        item,
                        this.updateNote.bind(this),
                        this.deleteNote.bind(this)
                    )
            );
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    loadNotes() {
        let result = this.srvStore.getStore();
        if (!result.length) result = initializeNotes();
        this.srvStore.setStore(result);
        return result;
    }

    addNote(note: Note) {
        // Mutando el array this.notes.push(note)
        this.notes = [...this.notes, note];
        this.srvStore.setStore(this.notes);
        this.manageComponent();
        return this.notes;
    }
    updateNote(id: string, data: Partial<Note>) {
        this.notes = this.notes.map((item) =>
            item.id === id ? { ...item, ...data } : item
        );
        this.srvStore.setStore(this.notes);
        this.manageComponent();
        return this.notes;
    }
    deleteNote(id: string) {
        this.notes = this.notes.filter((item) => item.id !== id);
        this.srvStore.setStore(this.notes);
        this.manageComponent();
        return this.notes;
    }

    private createTemplate() {
        return `
        <section class="notes">
            <h3>Lista de notas</h3>
            <ul class="slot-items"></ul>
        </section>
        `;
    }
}
