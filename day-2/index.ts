function gameFailureTest(ballNumber:number, ballColor: string): boolean {
  if(ballColor === "red" && ballNumber <= 12){
    return true;
  }
  if(ballColor === "green" && ballNumber <= 13){
    return true;
  }
  if(ballColor === "blue" && ballNumber <= 14){
    return true;
  }

  return false;
}

function getGameNumbers(game: string): number{
  const gameSplit = game.split(":");
  const gameNumber = gameSplit[0].split(" ")[1];
  return parseInt(gameNumber);
}

function getGameSets(game: string): string[][]{
  const gameSplit = game.split(":");
  const setsArr = gameSplit[1].split(";");
  const cleanSetArr: string[][] = [];
  
  setsArr.forEach((set)=>{
    const withoutEmptyStrings = set.split(' ').filter(el => !!el).join(" ").split(', ');
    cleanSetArr.push(withoutEmptyStrings)
  })
  
  return cleanSetArr;
}

function getGameAnswer(game: string): boolean{
  let res = true;
  const gameSplit = game.split(":");
  const setsArr = gameSplit[1].split(";");
  
  setsArr.forEach((set)=>{
    let red = 0;
    let green = 0;
    let blue = 0;
    const withoutEmptyStrings = set.split(' ').filter(el => !!el).join(" ").split(', ');
    withoutEmptyStrings.forEach(ball => {
      const num = ball.split(" ")[0]
      const color = ball.split(" ")[1]
      if(color === 'red'){
        red = red + parseInt(num);
      }
      if(color === 'green'){
        green = green + parseInt(num);
      }
      if(color === 'blue'){
        blue = blue + parseInt(num)
      }
    });
    
    if(!gameFailureTest(red, 'red') || !gameFailureTest(green, 'green') || !gameFailureTest(blue, 'blue')){
      res = false
    }
    
  }) 

  return res;
}
// get the minimum required balls in a color needed to play the game
function getMinimumBallNum(sets: string[][]): number[]{
  let red = 0;
  let green = 0;
  let blue = 0;
  // returns in rgb format
  sets.forEach((set)=>{
    set.forEach(ball => {
      const num = ball.split(" ")[0];
      const color = ball.split(" ")[1];
      if(color === 'red'){
        if(red < parseInt(num)){
          red = parseInt(num);
        }
      }
      if(color === 'green'){
        if(green < parseInt(num)){
          green = parseInt(num);
        }
      }
      if(color === 'blue'){
        if(blue < parseInt(num)){
          blue = parseInt(num);
        }
      }
    })
  })
  return [ red, green, blue]
}

// get the power of all minimum ball numbers ie: red * green * blue
function getPowerOfBalls(minBallRGB: number[]): number{
  let result = 1;
  for (let i = 0; i < minBallRGB.length; i++) {
    const num = minBallRGB[i];
    // const nextNum = minBallRGB[i + 1] === undefined ? 1 : minBallRGB[i + 1]

    result = result * num
  }
  return result;
}

function getSumOfArrNum(arr: number[]):number{
  let result = 0;
  arr.forEach(num=> result = result + num)
  return result;
}
function partTwo(gamesArr: string[]){
  const powersOfGameBalls: number[] = []
  gamesArr.forEach(game=>{
      const gameSets = getGameSets(game);
      const minimumColors = getMinimumBallNum(gameSets)
      powersOfGameBalls.push(getPowerOfBalls(minimumColors))
  })

  console.log("Part Two Answer: ",getSumOfArrNum(powersOfGameBalls))
}


function partOne(gamesArr: string[]){
  const gameIdsArr: number[] = []

  let totalSuccessIDs: number = 0;

  gamesArr.forEach(async (game)=>{
    const gameNumber = getGameNumbers(game);
    // console.log(gameNumber)
    const gameBag = getGameAnswer(game);
    // console.log(gameBag)
    
    
    
    
    
    if(gameBag){
      // console.log("Game number Success: ",gameNumber);
      // console.log("Game Bag: ", gameBag);
      gameIdsArr.push(gameNumber);
      totalSuccessIDs = totalSuccessIDs + gameNumber;
    }
  })
 
  console.log("Part One Answer: ",totalSuccessIDs);
}

async function main(){
  const path = './input.txt'
  const file = Bun.file(path);
  
  const text = await file.text();
  
  const gamesArr = text.split('\n');

  partOne(gamesArr);
  partTwo(gamesArr);
}


main();

