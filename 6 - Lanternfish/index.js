const { loadInput } = require("../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    let lanternFishes = input[0].split(",").map((n) => parseInt(n));
    
    const lanterFishCount = {};
    for (let i = 0; i < 9; i++) {
        lanterFishCount[i] = 0;
    }
    lanternFishes.forEach((lf) => {
        lanterFishCount[lf]++;
    });

    const days = 256;
    const result = fishesAfterDays(lanterFishCount, days);
    console.log(result);

    function fishesAfterDays(lanterFishCount, days) {
        const input = { ...lanterFishCount };
        for (let index = 0; index < days; index++) {
            addDay(input);
        }
        return Object.values(input).reduce((acc, val) => acc + val);
    }

    function addDay(fishCount) {
        const newFishes = fishCount[0];
        for (let index = 0; index < 8; index++) {
            fishCount[index] = fishCount[index + 1];
        }

        fishCount[8] = newFishes;
        fishCount[6] += newFishes;
    }
})();