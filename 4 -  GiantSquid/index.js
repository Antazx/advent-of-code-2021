const { loadInput } = require("../loadInput");

(async function main() {
    /** Polyfill filterIndexes*/
    Array.prototype.filterIndexes = function (callback) {
        const values = [];
        for (let index = 0; index < this.length; index++) {
            if (callback(this[index], index, this)) values.push(index);
        }
        return values;
    };

    const bingoInput = await loadInput("/home/user/code-things/advent-of-code-2021/4 -  GiantSquid/input.txt");
    const { numSequence, boards } = getBingo(bingoInput);
    const getSum = (acc, value) => (value != "X" ? acc + value : acc);

    const winners = getWinners(numSequence, boards);

    const firstWinner = winners[0];
    const lastWinner = winners[winners.length - 1];
    console.log(firstWinner.res);
    console.log(lastWinner.res);

    function getWinners(numSequence, inputBoards) {
        let boards = [...inputBoards];
        let uniqueWinningIndexes = [];

        for (let index = 0; index < numSequence.length && boards.length != uniqueWinningIndexes.length; index++) {
            let num = numSequence[index];
            markNumberInBoards(num, boards);

            let numIndexesWinners = boards.filterIndexes(win).map((i) => ({ i, num }));
            numIndexesWinners.forEach(({ i, num }) => {
                if (!uniqueWinningIndexes.find((ui) => ui.i === i))
                    uniqueWinningIndexes.push({
                        i,
                        num,
                        board: [...boards[i]],
                        res: getResults({ num, board: boards[i] }),
                    });
            });
        }

        return uniqueWinningIndexes;
    }

    function getResults({ num, board }) {
        const boardResult = board.reduce((acc, file) => acc + file.reduce(getSum, 0), 0);
        return boardResult * num;
    }

    function win(board) {
        const allX = (line) => line.every((col) => col == "X");
        const hasLine = board.some(allX);
        if (hasLine) return true;

        const transposedBoard = transpose(board);
        const hasColumn = transposedBoard.some(allX);
        if (hasColumn) return true;

        return false;
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
