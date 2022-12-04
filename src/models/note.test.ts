import { Note } from './note';

describe('Given "Note" data model', () => {
    const mockTitle = 'Test note';
    const mockResponsible = 'Test author';
    describe('When we have all the data', () => {
        test('Then it should instantiate a note', () => {
            const result = new Note(mockTitle, mockResponsible);
            expect(result).toBeInstanceOf(Note);
            expect(result).toHaveProperty('title', mockTitle);
            expect(result).toHaveProperty('author', mockResponsible);
            expect(result).toHaveProperty('isImportant', false);
        });
    });
    describe('When we have at least title data', () => {
        test('Then it should instantiate a note also', () => {
            const result = new Note(mockTitle);
            expect(result).toBeInstanceOf(Note);
            expect(result).toHaveProperty('title', mockTitle);
            expect(result).toHaveProperty('author', '');
            expect(result).toHaveProperty('isImportant', false);
        });
    });
});
