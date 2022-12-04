import { Note } from '../../../models/note.js';
import { NotesRepo } from '../../../repository/notes.repo.js';
import { consoleDebug } from '../../../tools/debug.js';
import { Component } from '../../component/component.js';
import { Add } from '../add/add.js';
import { Item } from '../item/item.js';

export class List extends Component {
    notes: Array<Note>;
    repo = new NotesRepo();
    constructor(private selector: string) {
        super();
        this.notes = [];
        this.manageComponent();
        this.loadNotes();
    }

    manageComponent() {
        consoleDebug(this.notes);
        this.template = this.createTemplate();
        this.render();
        try {
            this.notes.forEach((item) => {
                new Item(
                    'ul.slot-items',
                    item,
                    this.updateNote.bind(this),
                    this.deleteNote.bind(this)
                );
            });
            new Add('section.notes', this.addNote.bind(this));
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    async loadNotes() {
        this.notes = await this.repo.load();
        this.manageComponent();
        return this.notes;
    }

    async addNote(note: Partial<Note>) {
        const finalNote: Note = await this.repo.create(note);
        this.notes = [...this.notes, finalNote];
        this.manageComponent();
        return this.notes;
    }
    async updateNote(id: string, data: Partial<Note>) {
        data.id = id;
        const finalNote = await this.repo.update(data);
        this.notes = this.notes.map((item) =>
            item.id === id ? finalNote : item
        );
        this.manageComponent();
        return this.notes;
    }
    async deleteNote(id: string) {
        const finalId = await this.repo.delete(id);
        this.notes = this.notes.filter((item) => item.id !== finalId);
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
