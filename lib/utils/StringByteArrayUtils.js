const stringToUint8Array = (str) => {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return new Uint8Array(result);
};

const uint8ArrayToString = (array) => String.fromCharCode.apply(String, array);

export { stringToUint8Array, uint8ArrayToString };
