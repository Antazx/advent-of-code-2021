
const { input } = require("./input");

let increaseCounter = 0;
const countIncreases = (value, index, array) => { if(index > 0 && value > array[index - 1]) increaseCounter++ }
input.forEach(countIncreases);
console.log(increaseCounter);