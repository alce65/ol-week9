// Ámbitos (scopes) de un función
const foo = function () {
    const z = 22;
    // z no es parte de this
    console.log(this.z);
    return z;
};
// Se ejecuta foo en el scope global/del módulo
foo();
// Se ejecuta foo en el scope de la función setTimeout
setTimeout(foo, 1);
console.clear();

// Ámbitos (scopes) de un función arrow
const fooA = () => {
    const z = 22;
    console.log(this); // Lexical scope
    return z;
};
// Se ejecuta foo en el scope global/del módulo
// sin que influya en el valor de this
fooA();
// Se ejecuta foo en el scope de la función setTimeout
// sin que influya en el valor de this
setTimeout(fooA, 1);
