const makeAfter = (callback) => {
    setTimeout(() => {
        const data = Math.random();
        callback(data);
    }, 2000);
};

const add = (a) => console.log(a * a);
// add(makeAfter());
makeAfter(add);
