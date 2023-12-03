const fs = require('fs');

const data = fs.readFileSync('../input.txt').toString();

const EOL = require('os').EOL;

const lines = data.split(EOL);

const charCodeZero = "0".charCodeAt(0)
const charCodeNine = "9".charCodeAt(0)

const isNumber = (num) => {
    const charCode = num.charCodeAt(0)
    return charCode >= charCodeZero && charCode <= charCodeNine;
}

const isEnginePart = (i, j, numLength) => {

    const leftPossible = j - numLength - 1 >= 0;

    if (leftPossible) {
        const charOnLeft = lines[i][j - numLength - 1];
        if (!isNumber(charOnLeft) && charOnLeft !== '.') {
            return true
        }
    }

    const rightPossible = j < lines[0].length;

    if (rightPossible) {
        const charOnRight = lines[i][j];
        if (!isNumber(charOnRight) && charOnRight !== '.') {
            return true
        }
    }

    const startX = leftPossible ? j - numLength - 1 : j - numLength;
    const endX = rightPossible ? j : j - 1;

    // all top chars, if possible
    if (i - 1 >= 0) {

        for (let a = startX; a <= endX; a++) {
            const charOnTop = lines[i - 1][a];
            if (!isNumber(charOnTop) && charOnTop !== '.') {
                return true
            }
        }
    }

    // all bottom chars, if possible
    if (i + 1 < lines.length) {

        for (let b = startX; b <= endX; b++) {
            const charOnBottom = lines[i + 1][b];
            if (!isNumber(charOnBottom) && charOnBottom !== '.') {
                return true
            }
        }
    }

    return false;
}

let score = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let lastNumValue = '';
    for (let j = 0; j < line.length; j++) {
        const character = line[j];

        if (isNumber(character)) {
            
            lastNumValue += character
        } else {

            if (lastNumValue.length > 0) {

                if (isEnginePart(i, j, lastNumValue.length)) {
                    score += Number.parseInt(lastNumValue, 10);
                }
                lastNumValue = '';
            }
        }
    }

    if (lastNumValue.length > 0) {

        if (isEnginePart(i, line.length, lastNumValue.length)) {
            score += Number.parseInt(lastNumValue, 10);
        }
    }

}

console.log({score})
