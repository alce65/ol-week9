import { Note } from './note';

describe('Given "Note" data model', () => {
    test('Then it should instantiate a note', () => {
        const mockTitle = 'Test note';
        const mockResponsible = 'Test user';
        const result = new Note(mockTitle, mockResponsible);
        expect(result).toBeInstanceOf(Note);
        expect(result).toHaveProperty('title', mockTitle);
        expect(result).toHaveProperty('author', mockResponsible);
        expect(result).toHaveProperty('isImportant', false);
    });
});
