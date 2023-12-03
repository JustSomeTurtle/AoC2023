const fs = require('fs');

const data = fs.readFileSync('../input.txt').toString();

const EOL = require('os').EOL;

const lines = data.split(EOL);

let finalResult = 0;
for (const ln of lines) {

    const sets = ln.substring(ln.indexOf(':') + 1).split(';').map((letter) => letter.trim());

    const score = {
        red: 0,
        green: 0,
        blue: 0
    };
    for (const set of sets) {
        const cubes = set.split(',').map((s) => s.trim());
        for (const cube of cubes) {
            
            const value = Number.parseInt(cube.substring(0, cube.indexOf(' ')), 10);            
            const name = cube.substring(cube.indexOf(' ') + 1);
            if (value > score[name]) {
                score[name] = value;
            }
        }
    }
    const power = score['red'] * score['green'] * score['blue'];
    console.log({power});
    finalResult += power;
}

console.log({finalResult});
