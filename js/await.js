const makeAfterP = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = Math.random();
            if (data < 0.5) resolve(data);
            reject(new Error('Error con el número ' + data));
        }, 2000);
    });
};

const square = (a) => console.log(a * a);
const add = (a, b) => {
    const r = a + b;
    console.log(r);
    return;
};

// Promise ES2015 (ES6)
// async / await ES2018

(async () => {
    const x = 33;
    try {
        console.log('Seguimos');
        let data = await makeAfterP();
        data = add(data, x);
        square(data);
    } catch (error) {
        console.log(error.message);
    }
})();

// const x = 33;
// makeAfterP()
//     .then((data) => {
//         return add(data, x);
//     })
//     .then((data) => {
//         square(data);
//     })
//     .catch((error) => {
//         console.log(error.message);
//     });
// console.log('Seguimos');
