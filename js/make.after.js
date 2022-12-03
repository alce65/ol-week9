export const makeAfterP = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = Math.random();
            if (data < 0.5) resolve(data);
            reject(new Error('Error con el número ' + data));
        }, 2000);
    });
};
