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

// iterate through all input lines
for (const ln of inputLines) {
    
    // knowing input document, I can just get rid of all letters using letters and get 1st and last characters as I'll be sure they are numbers :D
    const rawNumLn = ln.replace(/[a-z]/gi, '')

    // 1st digit is...
    const firstDigit = rawNumLn[0]

    // ... and last one is...
    const lastDigit = rawNumLn[rawNumLn.length - 1]

    // combine these two...
    const twoDigitStr = firstDigit + lastDigit

    // ... and convert to integer ;)
    const twoDigitNum = Number.parseInt(twoDigitStr, 10)

    // now add this num to our final sum
    sum += twoDigitNum
}

// output sum as our result
console.log(`Total sum: ` + sum)
