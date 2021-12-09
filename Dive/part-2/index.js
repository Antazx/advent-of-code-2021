const { loadInput } = require("../../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    const result = calculatePosition(input);
    console.log(result);

    function calculatePosition(input) {
        let currentAim = 0;
        let currentDepth = 0;
        let currentXPosition = 0;

        const getDirection = (direction) => (move) =>
            move.includes(direction) ? parseInt(move.replace(`${direction} `, "")) : 0;

        for (let index = 0; index < input.length; index++) {
            let currentMove = input[index];

            let up = getDirection("up")(currentMove);
            let down = getDirection("down")(currentMove);
            let forward = getDirection("forward")(currentMove);

            currentAim += down - up;
            currentXPosition += forward;
            currentDepth += currentAim * forward;
        }

        return currentDepth * currentXPosition;
    }
})();