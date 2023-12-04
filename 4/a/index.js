const fs = require('fs');
const EOL = require('os').EOL;

const path = '../input.txt';

const inputFileContent = fs.readFileSync(path).toString();

const lines = inputFileContent.split(EOL);
const fixedLines = lines.map((ln) => ln.substring(ln.indexOf(':') + 1))

const calcScore = (n, l) => {
    for (let i = 0; i < l; i++) {
        n = n * 2;
    }

    return n;
};

let points = 0;
for (const line of fixedLines) {
    
    const strLotteryNrs = line.substring(0, line.indexOf('|'));
    const strYourNrs = line.substring(line.indexOf('|') + 1);

    const numLotteryNrs = strLotteryNrs.trim().replace(/  /g, ' ').split(' ').map((strNum) => Number.parseInt(strNum, 10));
    const numYourNrs = strYourNrs.trim().replace(/  /g, ' ').split(' ').map((strNum) => Number.parseInt(strNum, 10));

    const wonNrs = numLotteryNrs.filter((nr) => numYourNrs.includes(nr)).filter((v, i, a) => a.indexOf(v) === i)
    if (wonNrs.length > 0) {
        points += calcScore(1, wonNrs.length - 1)
    }
}

console.log({points});