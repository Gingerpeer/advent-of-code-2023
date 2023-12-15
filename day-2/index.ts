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

async function main(){
  const path = './input.txt'
  const file = Bun.file(path);
  
  const text = await file.text();
  
  const gamesArr = text.split('\n');

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
 
  console.log(totalSuccessIDs);
}


main();

