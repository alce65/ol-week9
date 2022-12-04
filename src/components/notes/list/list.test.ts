import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Note } from '../../../models/note';
import { List } from './list';
import * as debug from '../../../tools/debug.js';
import { Add } from '../add/add';
import { NotesRepo } from '../../../repository/notes.repo.js';

describe('Given "List" component', () => {
    const mockData = [
        new Note('Test note 1', 'Test author 1'),
        new Note('Test note 2', 'Test author 2'),
    ];
    NotesRepo.prototype.load = jest.fn().mockResolvedValue(mockData);
    document.body.innerHTML = `
            <slot name="slot1"></slot>
            <slot name="slot2"></slot>`;

    describe(`When it is instantiated with a valid selector
                And it is call with a DOM implementation`, () => {
        const list = new List('slot[name="slot1"]');
        test('Then we should to be able to instantiate it', () => {
            expect(list).toBeInstanceOf(List);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
        });

        test('Then H3 should be render', () => {
            const element = screen.queryByRole('heading', {
                name: 'Lista de notas',
            }); // <h3>
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element).toBeInTheDocument();
        });

        test('Then LIST should be render', () => {
            const element = screen.queryByRole('list'); // <ul />
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element).toBeInTheDocument();
        });
    });

    describe('When the child component has a NON valid selector', () => {
        Add.prototype.render = jest.fn().mockImplementation(() => {
            throw new Error('Invalid selector');
        });
        const debugSpy = jest.spyOn(debug, 'consoleDebug');
        let list: List;
        beforeEach(() => {
            list = new List('slot[name="slot2"]');
        });
        test('Then we should to be able to instantiate it without child components', () => {
            expect(list).toBeInstanceOf(List);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(Add.prototype.render).toBeCalled();
            expect(debugSpy).toBeCalled();
        });
    });

    describe('When its methods are called', () => {
        // No se usa NotesRepo.prototype.queryId = jest.fn();
        const mockNote = new Note('test', 'user');
        let list: List;
        let initialNotes: Array<Note>;
        beforeEach(() => {
            list = new List('slot');
            initialNotes = mockData;
        });
        test('Then if it is call addNote() the notes array should be returned with a new item', async () => {
            NotesRepo.prototype.create = jest.fn().mockResolvedValue(mockNote);
            await list.addNote(mockNote);
            expect(NotesRepo.prototype.create).toHaveBeenCalled();
            expect(list.notes.length).toBe(initialNotes.length + 1);
        });
        test('Then if it is call updateNote() the notes array should be returned with a updated item', async () => {
            const title = 'Updated title';
            const updateNote = { id: initialNotes[0].id, title };
            NotesRepo.prototype.update = jest
                .fn()
                .mockResolvedValue(updateNote);
            await list.updateNote(list.notes[0].id, { title });
            expect(NotesRepo.prototype.update).toHaveBeenCalled();
            expect(list.notes[0].title).toBe(title);
        });
        test('Then if ts call deleteNote() the notes array should be returned without the deleted item', async () => {
            NotesRepo.prototype.delete = jest
                .fn()
                .mockResolvedValue(list.notes[0].id);
            await list.deleteNote(list.notes[0].id);
            expect(NotesRepo.prototype.delete).toHaveBeenCalled();
            expect(list.notes.length).toBe(initialNotes.length - 1);
        });
    });
});
