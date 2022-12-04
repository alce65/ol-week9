import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Header } from './header';

describe('Given "Header" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    const header = new Header('slot');
    test('Then we should to be able to instantiate it', () => {
        expect(header).toBeInstanceOf(Header);
    });

    describe('When it is instantiate with a DOM selector', () => {
        const elements = [
            screen.getByRole('banner'), // <header />
            screen.getByRole('heading', { name: 'Learning Components' }), // <h1>
        ];
        const toRender = elements.map((item) => ({
            tag: item.tagName,
            element: item,
        }));

        test.each(toRender)(`Then $tag should be render`, ({ element }) => {
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element).toBeInTheDocument();
        });
    });
    describe(`When it is instantiate with a invalid DOM selector`, () => {
        test('No element should be render and an error should be throw', () => {
            expect(() => {
                const result = new Header('.invalid');
                result.render();
            }).toThrowError('Invalid selector');
        });
    });
});
