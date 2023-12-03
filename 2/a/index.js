const fs = require('fs');

const data = fs.readFileSync('../input.txt').toString();

const EOL = require('os').EOL;

const lines = data.split(EOL);

const limits = {
    red: 12,
    green: 13,
    blue: 14
}

let finalResult = 0;
for (const ln of lines) {

    const gameNr = Number.parseInt(ln.substring(5, ln.indexOf(':')), 10);

    const sets = ln.substring(ln.indexOf(':') + 1).split(';').map((letter) => letter.trim())

    let gameImpossible = false;
    for (const set of sets) {
        if (gameImpossible === true) {
            break;
        }
        const score = {
            red: 0,
            green: 0,
            blue: 0
        }
        const cubes = set.split(',').map((s) => s.trim())
        for (const cube of cubes) {
            
            const value = Number.parseInt(cube.substring(0, cube.indexOf(' ')), 10);            
            const name = cube.substring(cube.indexOf(' ') + 1)
            score[name] += value;
            if (score[name] > limits[name]) {
                gameImpossible = true;
                break;
            }
        }
    }
    if (gameImpossible === false) {
        finalResult += gameNr
    }
}

console.log({finalResult});
