import { makeAfterP } from './make.after.js';

const square = (a) => console.log(a * a);
const add = (a, b) => {
    const r = a + b;
    console.log(r);
    return r;
};

// Promise ES2015 (ES6)
// async / await ES2018
// async de nivel superior ES2021

const x = 33;
try {
    console.log('Seguimos');
    let data = await makeAfterP();
    data = add(data, x);
    square(data);
} catch (error) {
    console.log(error.message);
}
