const makeAfter = (callback) => {
    setTimeout(() => {
        const data = Math.random();
        callback(data);
    }, 2000);
};

const add = (a) => console.log(a * a);

// La idea inicial es que la función add utilice el valor "creado" en makeAfter
// pero eso no es posible, porque solo existirá en el futuro
// add(makeAfter());

// La solución basada en callbacks es enviar a la función add "al futuro"
// para que allí sea ejecutada por makeAfter
makeAfter(add);
