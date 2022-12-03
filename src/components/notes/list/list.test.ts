import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Note } from '../../../models/note';
import { List } from './list';
import * as debug from '../../../tools/debug.js';
import { Add } from '../add/add';

describe('Given "List" component', () => {
    describe('When it is instantiated with a valid selector', () => {
        document.body.innerHTML = `
            <slot name="slot1"></slot>
            <slot name="slot2"></slot>`;
        const list = new List('slot[name="slot1"]');
        const elements = [
            screen.getByRole('heading', { name: 'Lista de notas' }), // <h3>
            screen.getByRole('list'), // <ul />
        ];
        test('Then we should to be able to instantiate it', () => {
            expect(list).toBeInstanceOf(List);
        });
        describe.each(elements)(
            'When it is call with a DOM implementation',
            (element: HTMLElement) => {
                test(`Then ${element.tagName} should be render`, () => {
                    expect(element).toBeInstanceOf(HTMLElement);
                    expect(element).toBeInTheDocument();
                });
            }
        );
    });

    describe('When the child component has a NON valid selector', () => {
        Add.prototype.render = jest.fn().mockImplementation(() => {
            throw new Error('Invalid selector');
        });
        const debugSpy = jest.spyOn(debug, 'consoleDebug');
        const list = new List('slot[name="slot2"]');
        expect(list).toBeInstanceOf(List);
        expect(Add.prototype.render).toBeCalled();
        expect(debugSpy).toBeCalled();
    });

    describe('When its methods are called', () => {
        const mockNote = new Note('test', 'user');
        let list: List;
        let initialNotes;
        beforeEach(() => {
            list = new List('slot');
            initialNotes = [...list.notes];
        });
        test('Then if it is call addNote() the notes array should be returned with a new item', () => {
            list.addNote(mockNote);
            expect(list.notes.length).toBe(initialNotes.length + 1);
        });
        test('Then if it is call updateNote() the notes array should be returned with a updated item', () => {
            const title = 'Updated title';
            list.updateNote(list.notes[0].id, { title });
            expect(list.notes[0].title).toBe(title);
        });
        test('Then if ts call deleteNote() the notes array should be returned without the deleted item', () => {
            list.deleteNote(list.notes[0].id);
            expect(list.notes.length).toBe(initialNotes.length - 1);
        });
    });
});
