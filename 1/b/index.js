// lib for reading files
const fs = require('fs')

// path to the input file
const inputFilePath = '../input.txt'

// whole content of the input file
const inputString = fs.readFileSync(inputFilePath).toString();

// end of line character on current OS
const EOL = require('os').EOL;

// split content of file into separated lines
const inputLines = inputString.split(EOL)

// sum of all so-called 'calibration values'
let sum = 0

// array of possible letter names
const letterMapping = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

const charCodeOne = "1".charCodeAt(0)
const charCodeNine = "9".charCodeAt(0)

const letterNames = Object.keys(letterMapping);

// iterate through all input lines
for (const ln of inputLines) {
    
    let firstNum = ''
    let word = ''

    const lnArr = ln.split('')

    // find first number
    for (const character of lnArr) {
    
        // check if char is number
        const charCode = character.charCodeAt(0);
        if (charCode >= charCodeOne && charCode <= charCodeNine) {

            firstNum = character
            break;
        } else {

            const wordCandidates = letterNames.filter((name) => name.startsWith(word + character))

            if (wordCandidates.length > 0) {
                
                word += character;
                if (wordCandidates.find((cand) => cand === word)) {
                    firstNum = letterMapping[word]
                    break;
                }
            } else {
                word = word[word.length - 1] + character
            }
        }
    }

    let lastNum = ''

    word = ''

    // find last number
    for (const character of lnArr.reverse()) {

        // check if char is number
        const charCode = character.charCodeAt(0);
        if (charCode >= charCodeOne && charCode <= charCodeNine) {

            lastNum = character
            break;
        } else {

            const wordCandidates = letterNames.filter((name) => name.endsWith(character + word))
            if (wordCandidates.length > 0) {
                
                word = character + word;
                if (wordCandidates.find((cand) => cand === word)) {
                    lastNum = letterMapping[word]
                    break;
                }
            } else {
                word = character + word[0]
            }
        }
    }

    // combine these two...
    const twoDigitStr = firstNum + lastNum

    // ... and convert to integer ;)
    const twoDigitNum = Number.parseInt(twoDigitStr, 10)

    //fs.appendFileSync('out2.txt', `${twoDigitStr}\r\n`);

    console.log({ln, twoDigitStr});

    // now add this num to our final sum
    sum += twoDigitNum
}

// output sum as our result
console.log(`Total sum: ` + sum)
