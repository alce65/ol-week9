/* eslint-disable @typescript-eslint/no-unused-vars */
const a = 33;
const foo = function () {
    const z = 22;
    console.log(this.z);
};
foo();
setTimeout(foo, 1);
console.clear();
const fooA = () => {
    const z = 22;
    console.log(this); // Lexical scope
};
fooA();
setTimeout(fooA, 1);
