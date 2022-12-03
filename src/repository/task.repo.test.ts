import expect from 'expect';
import { Task } from '../models/task';
import { StoreArray } from '../services/storage';
import { TaskRepo } from './task.repo';

describe('Given a Task Repo', () => {
    const mockTask = new Task('Test task', 'Test user');
    const mockData = [mockTask];
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
        const id = mockTask.id;
        test('Then, if the id is VALID, we received the task searched in the repo', () => {
            const data = repo.query({ id });
            expect(StoreArray.prototype.getStore).toHaveBeenCalled();
            expect(data).toEqual(mockData[0]);
        });
        test('Then, if the id is NOT VALID, we received a null', () => {
            const data = repo.query({ id: '23' });
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
            (StoreArray.prototype.getStore as jest.Mock).mockReturnValueOnce(
                mockData
            );
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
            // (StoreArray.prototype.getStore as jest.Mock).mockReturnValueOnce(
            //     mockData
            // );
            const data = repo.create({});
            expect(data).toBeNull();
        });
    });

    describe('When', () => {
        test('Then', () => {
            //
        });
    });
});
