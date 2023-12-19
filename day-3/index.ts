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


/*
  1. Get input and read 
  2. We need to split the total text into an array of string lines./
  3. We find the locations of all the numbers separated by non numbers
    3.1 We need to ensure to get the length of the numbers with each character location being recorded
  4. We then need to find the locations of all the legal symbols excluding "."
  5. We then need to see if the previous number locations in the string are the location before, after or in the previous line or the next line.
  6. Conditional if the previous condition is met ie number 5. Then the number must be added to an array of Part Numbers.
  7. Once this step is concluded, all the numbers in the part numbers array must be summed together.
*/


const path = './input.txt'
const file = Bun.file(path);

const text = await file.text();
const arrayOfPartNumbers = [];

const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;


function isStringNumeric(input: string): boolean {
  return !isNaN(Number(input));
}


const split = text.split('\n')


const test = split[5].split("")

let lastNumIndex: number;
test.forEach((element, index) => {
    if(isStringNumeric(element)){
      lastNumIndex = index
    }
    console.log(isStringNumeric(element), index)
});


// split.forEach(element => {
//   if(symbolRegex.test(element)){
    
//     console.log(element.split('.'))
//   }
// });