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