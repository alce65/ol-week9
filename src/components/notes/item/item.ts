import { Note } from '../../../models/note.js';
import { consoleDebug } from '../../../tools/debug.js';
import { Component } from '../../component/component.js';

export class Item extends Component {
    constructor(
        private selector: string,
        private item: Note,
        private updateNote: (id: string, data: Partial<Note>) => void,
        private deleteNote: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        element
            .querySelector('[type="checkbox"]')
            ?.addEventListener('change', this.handleCheck.bind(this));
        element
            .querySelector('[role="button"]')
            ?.addEventListener('click', this.handleButton.bind(this));
        return element;
    }

    handleCheck() {
        const result: Partial<Note> = {
            id: this.item.id,
            isImportant: !this.item.isImportant,
        };
        consoleDebug('checked: ' + result);
        this.updateNote(this.item.id, result);
    }

    handleButton() {
        consoleDebug('deleted');
        this.deleteNote(this.item.id);
    }

    private createTemplate() {
        return `
        <li class="item-note" id="item_${this.item.id}">
            <span class="item-note__start">
                <input type="checkbox" ${this.item.isImportant && 'checked'}>
                <span>${this.item.id}</span>
            </span>
            <span class="item-note__middle">
                <output>${this.item.title}</output>
                <output>${this.item.author}</output>
            </span>
            <span role="button" class="item-note__end button">
                🗑️
            </span>
        </li>
        `;
    }
}
