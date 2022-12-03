import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Note } from '../../../models/note';
import { Item } from './item';

describe('Given "Item" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    const updateNote = jest.fn();
    const deleteNote = jest.fn();
    const mockTitle = 'Test note';
    const mockUser = 'Test user';
    const newNote = new Note(mockTitle, mockUser);
    newNote.isImportant = true;
    const itemNote = new Item('slot', newNote, updateNote, deleteNote);
    const elements = [
        screen.getByRole('listitem'), // <li />
        screen.getByRole('checkbox'),
        ...screen.getAllByRole('status'), // 2 * <output>
        screen.getByRole('button'),
    ];
    test('Then we should to be able to instantiate it', () => {
        expect(itemNote).toBeInstanceOf(Item);
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
    describe('When data are provided in the component', () => {
        test('Then user could interact with them ', async () => {
            const user = userEvent.setup();
            expect(elements[2]).toHaveValue(mockTitle);
            expect(elements[3]).toHaveValue(mockUser);
            await user.click(elements[1]);
            expect(updateNote).toHaveBeenCalledTimes(1);
            await user.click(elements[4]);
            expect(deleteNote).toHaveBeenCalledTimes(1);
        });
    });
});
