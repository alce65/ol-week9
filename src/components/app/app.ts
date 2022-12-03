import { AboutPage } from '../../pages/about/about.js';
import { HomePage } from '../../pages/home/home.js';
import { NotesPage } from '../../pages/notes/notes.js';
import { TodoPage } from '../../pages/todo/todo.js';
import { consoleDebug } from '../../tools/debug.js';
import { MenuOptionsType } from '../../types/menu.options.js';
import { Footer } from '../core/footer/footer.js';
import { Header } from '../core/header/header.js';
import { Menu } from '../core/menu/menu.js';

export class App {
    menuOptions: MenuOptionsType;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            { path: './todo.html', label: 'Task' },
            { path: './notes.html', label: 'Notes' },
            { path: './about.html', label: 'About' },
        ];
        try {
            new Header('.root');
            new Menu('header', this.menuOptions);
            this.router();
            new Footer('.root');
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    router() {
        const path = './' + location.pathname.split('/').at(-1);
        switch (path) {
            case this.menuOptions[0].path:
                return new HomePage('.root');
            case this.menuOptions[1].path:
                return new TodoPage('.root');
            case this.menuOptions[2].path:
                return new NotesPage('.root');
            case this.menuOptions[3].path:
                return new AboutPage('.root');
            default:
                throw new Error('Path no disponible');
        }
    }
}
