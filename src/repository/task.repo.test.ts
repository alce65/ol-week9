import expect from 'expect';
import { Task } from '../models/task';
import { StoreArray } from '../services/storage';
import { TaskRepo } from './task.repo';

describe('Given a Task Repo', () => {
    const mockData = [
        new Task('Test task 1', 'Test user 1'),
        new Task('Test task 2', 'Test user 2'),
    ];
    const repo = new TaskRepo(new StoreArray('Tasks'));

    beforeEach(() => {
        StoreArray.prototype.getStore = jest
            .fn()
            .mockImplementation(() => mockData);
        StoreArray.prototype.setStore = jest.fn();
    });

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(TaskRepo);
    });

    describe('When we use load method', () => {
        test('Then we received the tasks contents in the repo', () => {
            const data = repo.load();
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
    });

    describe('When we use query method', () => {
        const id = mockData[0].id;
        test('Then, if the id is VALID, we received the task searched in the repo', () => {
            const data = repo.queryId(id);
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(data).toEqual(mockData[0]);
        });
        test('Then, if there are NOT id, we received a null', () => {
            const data = repo.queryId('');
            expect(StoreArray.prototype.getStore).not.toHaveBeenCalled();
            expect(data).toBeNull();
        });
        test('Then, if the id is NOT VALID, we received a null', () => {
            const data = repo.queryId('23');
            (StoreArray.prototype.getStore as jest.Mock).mockReturnValueOnce(
                null
            );
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(data).toBeNull();
        });
    });

    describe('When we use create method', () => {
        test(`Then if the data are VALID, we received the task 
                created in the repo with its own new id`, () => {
            const mockNewTaskPayload: Partial<Task> = {
                title: 'New task',
                responsible: 'Test user',
            };
            const data = repo.create(mockNewTaskPayload);
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(StoreArray.prototype.setStore).toHaveBeenCalled();
            expect(data).toHaveProperty('title', mockNewTaskPayload.title);
            expect(data).toHaveProperty(
                'responsible',
                mockNewTaskPayload.responsible
            );
        });
        test(`Then if the data are NOT VALID, we received a null`, () => {
            const data = repo.create({});
            expect(data).toBeNull();
        });
    });

    describe('When we use update method', () => {
        test(`Then if the ID are VALID, we received the task 
                update in the repo`, () => {
            const updatePayload: Partial<Task> = {
                id: mockData[0].id,
                responsible: 'Ursula',
            };
            const data = repo.update(updatePayload);
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(StoreArray.prototype.setStore).toHaveBeenCalled();
            expect(data).toHaveProperty(
                'responsible',
                updatePayload.responsible
            );
        });
        test(`Then if there are NOT ID, we received a null`, () => {
            const data = repo.update({});
            expect(data).toBeNull();
        });
        test(`Then if the ID are NOT VALID, we received a null`, () => {
            const updatePayload: Partial<Task> = {
                id: 'bad',
                responsible: 'Ursula',
            };
            const data = repo.update(updatePayload);
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(data).toBeNull();
        });
    });

    describe('When we use delete method', () => {
        test(`Then if the ID are VALID, we received the ID 
                of the task delete in the repo`, () => {
            const id = mockData[0].id;
            const data = repo.delete(id);
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(StoreArray.prototype.setStore).toHaveBeenCalled();
            expect(data).toBe(id);
        });
        test(`Then if there are NOT ID, we received a null`, () => {
            const data = repo.delete('');
            expect(StoreArray.prototype.getStore).not.toHaveBeenCalled();
            expect(data).toBeNull();
        });
        test(`Then if the ID are NOT VALID, we received a null`, () => {
            const data = repo.delete('bad');
            expect(data).toBeNull();
        });
    });
});
