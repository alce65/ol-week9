import { Note } from '../../../models/note.js';
import { Component } from '../../component/component.js';

type DataFormType = {
    title: string;
    author: string;
};

export class Add extends Component {
    constructor(
        private selector: string,
        public handleAdd: (note: Note) => void
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        const element = super.innRender(this.selector, 'start');
        element
            .querySelector('form.add-note')
            ?.addEventListener('submit', this.handleForm.bind(this));
        return element;
    }

    handleForm(event: Event) {
        const dataForm: DataFormType = {
            title: '',
            author: '',
        };

        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const inputs = [
            ...formElement.querySelectorAll('[type="text"]'),
            ...formElement.querySelectorAll('[type="number"]'),
            ...formElement.querySelectorAll('select'),
        ];
        [dataForm.title, dataForm.author] = [...inputs].map(
            (item) => (item as HTMLFormElement).value
        );
        const newNote = new Note(dataForm.title, dataForm.author);
        this.handleAdd({ ...newNote });
    }

    private createTemplate() {
        return `
        <section>
            <h3>Añadir nota</h3>
            <form class="add-note">
                <div>
                    <label for="title">Nota</label>
                    <input type="text" name="title" id="title" placeholder="Escribe la nota" required>
                </div>
                <div>
                    <label for="author">Autor</label>
                    <input type="text" name="author" id="author" placeholder="Autor de la nota">
                </div>
                <div>
                    <button type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
    }
}
