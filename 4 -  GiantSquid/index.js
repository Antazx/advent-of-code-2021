const { loadInput } = require("../loadInput");

(async function main() {
    const bingoInput = await loadInput("./input.txt");
    const { numSequence, boards } = getBingo(bingoInput);
    const { winner, num } = getWinner(numSequence, boards);
    const winningValue = winner.reduce((acc, value) => (value != "X" ? acc + value : acc), 0);
    const result = num * winningValue;

    console.log(result);

    function getWinner(numSequence, boards) {
        let winner = null;
        for (let num of numSequence) {
            markNumberInBoards(num, boards);
            winner = boards.filter(win);
            if (winner.length > 0) return { winner: winner.flat(2), num };
        }
    }

    function win(board) {
        const allX = (line) => line.every((col) => col == "X");
        const hasLine = board.some(allX);
        if (hasLine) return board;

        const transposedBoard = transpose(board);
        const hasColumn = transposedBoard.some(allX);
        if (hasColumn) return board;

        return null;
    }

    function transpose(report) {
        const matrix = [...report];
        const rowCount = matrix.length;
        const columCount = matrix[0].length;
        let formattedReport = [];

        for (let columIndex = 0; columIndex < columCount; columIndex++) {
            formattedReport[columIndex] = [];
            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                formattedReport[columIndex].push(matrix[rowIndex][columIndex]);
            }
        }
        return formattedReport;
    }

    function markNumberInBoards(num, boards) {
        for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
            let currentBoard = boards[boardIndex];
            for (let rowIndex = 0; rowIndex < currentBoard.length; rowIndex++) {
                let currentRow = currentBoard[rowIndex];
                for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
                    if (currentRow[columnIndex] == num) currentRow[columnIndex] = "X";
                }
            }
        }
    }

    function getBingo(bingoInput) {
        const removeEmpty = (i) => i;
        const toNumber = (i) => +i;
        const formatLine = (l) => l.split(" ").filter(removeEmpty).map(toNumber);

        const numSequence = bingoInput[0].split(",").map(toNumber);
        const boards = [];

        for (let index = 1; index < bingoInput.length; index++) {
            let newBoard = !bingoInput[index].charCodeAt(0);
            newBoard ? boards.push([]) : boards[boards.length - 1].push(formatLine(bingoInput[index]));
        }

        return { numSequence, boards };
    }
})();
