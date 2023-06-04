export const checkValue = (value, exp) => {
    const regexg = new RegExp(exp);
    return regexg.test(value);
};
