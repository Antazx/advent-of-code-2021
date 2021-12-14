const { loadInput } = require("../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    const lines = parseLines(input);

    const vertical = (line) => line.start.y === line.end.y;
    const horizontal = (line) => line.start.x === line.end.x;
    const diagonal = (line) => Math.abs(line.start.x - line.end.x) === Math.abs(line.start.y - line.end.y);

    const filteredLines = lines.filter((line) => horizontal(line) || vertical(line) || diagonal(line));
    const boardSizes = filteredLines.map((line) => [line.start.x, line.start.y, line.end.x, line.end.y]).flat().sort();

    const size = boardSizes[boardSizes.length - 1] + 1;
    const board = new Array(size);
    for (let index = 0; index < board.length; index++) {
        board[index] = new Array(size).fill(0);
    }

    printMoves(board, filteredLines);
    console.log(board.flat().filter((e) => e >= 2).length);

    function move(board, start, end) {
        let { x, y } = start;
        let { x: xEnd, y: yEnd } = end;

        const xDirection = Math.sign(xEnd - x);
        const yDirection = Math.sign(yEnd - y);

        if (xDirection && yDirection) {
            while (y != yEnd + yDirection || x != xEnd + xDirection) {
                board[y][x]++;
                y += yDirection;
                x += xDirection;
            }
        } else {
            while (x != xEnd + xDirection) {
                board[y][x]++;
                x += xDirection;
            }

            while (y != yEnd + yDirection) {
                board[y][x]++;
                y += yDirection;
            }
        }
    }

    function printMoves(board, moves) {
        for (let indexMove = 0; indexMove < moves.length; indexMove++) {
            const { start, end } = moves[indexMove];
            move(board, start, end);
        }
    }

    function parseLines(input) {
        return input.map((line) => {
            let [start, end] = line.split(" -> ").map((number) => {
                const [x, y] = number.split(",").map((n) => parseInt(n));
                return { x, y };
            });
            return { start, end };
        });
    }
})();
