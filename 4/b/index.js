const fs = require('fs');
const EOL = require('os').EOL;

const path = '../input.txt';

const inputFileContent = fs.readFileSync(path).toString();

const lines = inputFileContent.split(EOL);
const fixedLines = lines.map((ln) => ln.substring(ln.indexOf(':') + 1))

const cards = {};
for (let y = 0; y < lines.length; y++) {
    cards[y] = 1;
}
for (let i = 0; i < fixedLines.length; i++) {
    const line = fixedLines[i];
    const strLotteryNrs = line.substring(0, line.indexOf('|'));
    const strYourNrs = line.substring(line.indexOf('|') + 1);

    const numLotteryNrs = strLotteryNrs.trim().replace(/  /g, ' ').split(' ').map((strNum) => Number.parseInt(strNum, 10));
    const numYourNrs = strYourNrs.trim().replace(/  /g, ' ').split(' ').map((strNum) => Number.parseInt(strNum, 10));

    const wonNrs = numLotteryNrs.filter((nr) => numYourNrs.includes(nr)).filter((v, i, a) => a.indexOf(v) === i)
    for (let j = i + 1; j < i + 1 + wonNrs.length; j++) {
        cards[j] += cards[i];
    }
}

console.log({
    score: Object.values(cards).map((val) => Number.parseInt(val)).reduce((a, b) => a + b)
});
