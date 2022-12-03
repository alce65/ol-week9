import { Task } from './task';

describe('Given "Task" data model', () => {
    const mockTitle = 'Test task';
    const mockResponsible = 'Test user';
    describe('When we have all the data', () => {
        test('Then it should instantiate a task', () => {
            const result = new Task(mockTitle, mockResponsible);
            expect(result).toBeInstanceOf(Task);
            expect(result).toHaveProperty('title', mockTitle);
            expect(result).toHaveProperty('responsible', mockResponsible);
            expect(result).toHaveProperty('isCompleted', false);
        });
    });
    describe('When we have at least title data', () => {
        test('Then it should instantiate a task also', () => {
            const result = new Task(mockTitle);
            expect(result).toBeInstanceOf(Task);
            expect(result).toHaveProperty('title', mockTitle);
            expect(result).toHaveProperty('responsible', '');
            expect(result).toHaveProperty('isCompleted', false);
        });
    });
});
