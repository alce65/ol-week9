import { Note } from '../models/note.js';

export const NOTES = [
    new Note('Una Nota', 'Pepe'),
    new Note('Otra nota', 'Ernesto'),
    new Note('Una nota mas', 'Elvira'),
].map((item) => ({ ...item }));

export const initializeNotes = () => NOTES;
