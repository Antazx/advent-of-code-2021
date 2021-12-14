const { loadInput } = require("../loadInput");

(async function main() {
    const input = await loadInput("./input.txt");
    const crabs = input[0].split(",").map(n => +n);
    
    let pointsToEvaluate = [];
    for(let index = 1; index < crabs.length; index++) {
        let first = crabs[index - 1];
        let second = crabs[index];
        
        let distance =  Math.abs(first - second);
        let desiredPosition = distance/2 + Math.min(first, second);
        let points = desiredPosition % 1 == 0 
            ? [desiredPosition] 
            : [Math.floor(desiredPosition), Math.ceil(desiredPosition)];
        pointsToEvaluate = [...new Set([...pointsToEvaluate, ...points])];
    }
    
    const getFuel = (n) => n > 0 ? n + getFuel(n - 1) : 0;
    const consumptions = pointsToEvaluate.map(p => 
        ({ p, fuel: crabs.reduce((acc, crab) => acc + getFuel(Math.abs(p - crab)),0) }))
    console.log(consumptions.sort((a,b) => a.fuel - b.fuel));
})();