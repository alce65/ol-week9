console.log('Linea 1');
setTimeout(() => console.log('Linea 2'), 2000);
setTimeout(() => console.log('Linea 4'), 0);
setTimeout(() => console.log('Linea 5'), 1000);

// Un proceso pesado de computación
// bloquearía el hilo de ejecución
// let a = 0;
// for (let index = 0; index < 1000_000_000_000; index++) {
//     a++;
// } /// 3000

console.log('Linea 6');
console.log('Linea 7');
