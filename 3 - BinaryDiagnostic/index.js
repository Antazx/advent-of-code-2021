const { loadInput } = require("../loadInput");

(async function main() {
    const invertBits = (bit) => +!bit;
    const diagnosticReport = await loadInput("./input.txt");
    const powerConsumption = getPowerConsumption(diagnosticReport);
    const lifeSupportRating = getLifeSupportRating(diagnosticReport);

    console.log(`powerConsumption: ${powerConsumption}`);
    console.log(`lifeSupportRating: ${lifeSupportRating}`);

    function getLifeSupportRating(report) {
        const oxygenBits = filterReport(report, "oxygen");
        const scrubberBits = filterReport(report, "scrubber");
        const oxygenRating = parseInt(oxygenBits, 2);
        const scrubberRating = parseInt(scrubberBits, 2);

        return oxygenRating * scrubberRating;
    }

    function filterReport(initialReport, criteria) {
        const bitInPosition = (bit) =>(position) => (line) => line[position] == bit;
        let report = [...initialReport];
        let position = 0;

        while (report.length > 1) {
            let oxygenBits = formatReport(report).map(mostCommonBit("oxygen"));
            let scrubberBits = oxygenBits.map(invertBits);
            let bitToFilter = criteria == "oxygen" ? oxygenBits[position] : scrubberBits[position];
            report = report.filter(bitInPosition(bitToFilter)(position));
            position++;
        }
        return report;
    }

    function getPowerConsumption(diagnosticReport) {
        const formattedReport = formatReport(diagnosticReport);
        const gammaRateBits = formattedReport.map(mostCommonBit());
        const epsilonRateBits = gammaRateBits.map(invertBits);
        const gammaRate = parseInt(gammaRateBits.join(""), 2);
        const epsilonRate = parseInt(epsilonRateBits.join(""), 2);

        return gammaRate * epsilonRate;
    }

    function mostCommonBit(bitCriteria) {
        return function (reportLine) {
            let zeroCount = 0;
            let oneCount = 0;

            for (let bitIndex = 0; bitIndex < reportLine.length; bitIndex++) {
                let bit = reportLine[bitIndex];
                if (bit === "0") zeroCount++;
                if (bit === "1") oneCount++;
            }
            if (bitCriteria == "oxygen" && zeroCount == oneCount) return 1;
            return zeroCount > oneCount ? 0 : 1;
        };
    }

    function formatReport(report) {
        const matrix = report.map((line) => line.split(""));
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
})();
