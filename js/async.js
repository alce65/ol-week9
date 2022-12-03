const foo = async (a = 0, b = 0) => {
    if (!b) throw new Error('Invalid operators');
    return a / b;
};

foo(3, 0)
    .then((r) => console.log(r))
    .catch((error) => console.log(error.message));

// Equivaldría al mismo proceso síncrono

const bar = (a = 0, b = 0) => {
    if (!b) throw new Error('Invalid operators');
    return a / b;
};

try {
    const r = bar(4, 6);
    console.log(r);
} catch (e) {
    console.log(e.message);
}
