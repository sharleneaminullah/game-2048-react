/* Functions that provides generic calculation*/

export const cloneObject = (obj) => {return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)}
export const generateRandomNumber = (len) => Math.floor(Math.random() * len);
export const generateTwoOrFour = (probability) => Math.random() < probability ? 2 : 4;
