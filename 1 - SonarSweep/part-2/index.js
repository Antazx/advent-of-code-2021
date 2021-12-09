const { loadInput } = require("../../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    const result = countIncreases(input.map(n => parseInt(n)), 3);
    console.log(result);

    function countIncreases(values, blockSize = 1) {

        const sum = (acc, v) => acc + v;
        let increaseCounter = 0;
        let previousSum;

        for (let index = blockSize; index < values.length + 1; index++) {
            const valuesToSum = values.slice(index - blockSize, index);
            const newSum = valuesToSum.reduce(sum, 0);
            if(newSum > previousSum) increaseCounter++
            previousSum = newSum;
        }

        return increaseCounter;
    }
})();
