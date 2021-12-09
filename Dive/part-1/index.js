const { loadInput } = require("../../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    const result = calculatePosition(input);
    console.log(result);

    function calculatePosition(input) {
        const toNumber = (n) => parseInt(n);
        const sum = (acc, value) => acc + value;
        const format = (direction) => (move) => toNumber(move.replace(`${direction} `, ""));
        const findDirection = (direction) => (move) => move.includes(direction);

        const forwardMoves = input.filter((move) => findDirection("forward")(move)).map(format("forward"));
        const upMoves = input.filter((move) => findDirection("up")(move)).map(format("up"));
        const downMoves = input.filter((move) => findDirection("down")(move)).map(format("down"));

        const xPosition = forwardMoves.reduce(sum, 0);
        const upSum = upMoves.reduce(sum, 0);
        const downSum = downMoves.reduce(sum, 0);
        const depthPosition = downSum - upSum;

        return xPosition * depthPosition;
    }
})();
