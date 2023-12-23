/*
Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

*/

import { rejects } from "assert";
import { resolve } from "bun";


/*
  1. Get input and read X
  2. We need to split the total text into an array of string lines. X
  3. We find the locations of all the numbers separated by non numbers
    3.1 We need to ensure to get the length of the numbers with each character location being recorded
  4. We then need to find the locations of all the legal symbols excluding "."
  5. We then need to see if the previous number locations in the string are the location before, after or in the previous line or the next line.
  6. Conditional if the previous condition is met ie number 5. Then the number must be added to an array of Part Numbers.
  7. Once this step is concluded, all the numbers in the part numbers array must be summed together.
*/

type ArrType = {
  element: string
  index: number
  lineNumber: number
}
function isStringNumeric(input: string): boolean {
  return !isNaN(Number(input));
}

async function getSpecialCharAndNumsArrays(lineArr: string[]){
  let lineNumber: number = 0;
  
  return new Promise(async( resolve ) => {
    await setTimeout(()=> { 
      lineArr.forEach((element) => {
        const charArr = element.split("");
        charArr.forEach((el, i) => {
            if(symbolRegex.test(el)){
              arrayOfSpecialChars.push({ element: el, index: i, lineNumber})
            }
            if(isStringNumeric(el)){
              arrayOfNumberChars.push({ element: el, index: i, lineNumber})
            }
        })
        lineNumber ++
    });
    resolve("The operation completed")
    }, 2000)
  })
}

async function getPartNumbers(specialCharArr: ArrType[], specialNumberChars: ArrType[]): Promise<number[]>{
  return new Promise((resolve)=>{
    const partsArr: number[] = [];

    // check if the previous index number is a number on the line, this will be used to create a full number
    let prevIndex: number | undefined = undefined;
    let prevLine: number | undefined = undefined;
    let prevNum: string | undefined = undefined;

    specialNumberChars.forEach((num)=> {

        prevIndex = num.index  
        prevLine = num.lineNumber
        prevNum = num.element
    })
    
    // this is just a test to see if the function works as expected
    partsArr.push(parseInt(specialNumberChars[2].element));
    resolve(partsArr)
  })
}
const path = './input.txt'
const file = Bun.file(path);

const text = await file.text();


// with special char, index on line and line number
let arrayOfSpecialChars: ArrType[] = [];
// with number, index on line and line number
let arrayOfNumberChars: ArrType[] = [];
// Array of part numbers
let arrayOfPartNumbers: number[];


// proper test to see if the character has a special character
const symbolRegex = /[^a-zA-Z0-9.]/;








const newLineSplit = text.split('\n')

getSpecialCharAndNumsArrays(newLineSplit).then(()=>{
  getPartNumbers(arrayOfSpecialChars, arrayOfNumberChars).then((result: number[])=> {
    arrayOfPartNumbers = result;
    console.log(result)
  })
})

// console.log(arrayOfSpecialChars)
// console.log(arrayOfNumberChars)
