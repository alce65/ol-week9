import { initializeTasks } from '../../../mocks/tasks.js';
import { Task } from '../../../models/task.js';
import { StoreArray } from '../../../services/storage.js';
import { consoleDebug } from '../../../tools/debug.js';
import { Component } from '../../component/component.js';
import { Add } from '../add/add.js';
import { Item } from '../item/item.js';

export class List extends Component {
    tasks: Array<Task>;
    srvStore = new StoreArray<Task>('Tasks');
    constructor(private selector: string) {
        super();
        this.tasks = this.loadTasks();
        this.manageComponent();
    }

    manageComponent() {
        consoleDebug(this.tasks);
        this.template = this.createTemplate();
        this.render();
        try {
            new Add('section.tasks', this.addTask.bind(this));
            this.tasks.forEach(
                (item) =>
                    new Item(
                        'ul.slot-items',
                        item,
                        this.updateTask.bind(this),
                        this.deleteTask.bind(this)
                    )
            );
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    loadTasks() {
        let result = this.srvStore.getStore();
        if (!result.length) result = initializeTasks();
        this.srvStore.setStore(result);
        return result;
    }

    addTask(task: Task) {
        // Mutando el array this.tasks.push(task)
        this.tasks = [...this.tasks, task];
        this.srvStore.setStore(this.tasks);
        this.manageComponent();
        return this.tasks;
    }
    updateTask(id: string, data: Partial<Task>) {
        this.tasks = this.tasks.map((item) =>
            item.id === id ? { ...item, ...data } : item
        );
        this.srvStore.setStore(this.tasks);
        this.manageComponent();
        return this.tasks;
    }
    deleteTask(id: string) {
        this.tasks = this.tasks.filter((item) => item.id !== id);
        this.srvStore.setStore(this.tasks);
        this.manageComponent();
        return this.tasks;
    }

    private createTemplate() {
        return `
        <section class="tasks">
            <h3>Lista de tareas</h3>
            <ul class="slot-items"></ul>
        </section>
        `;
    }
}
