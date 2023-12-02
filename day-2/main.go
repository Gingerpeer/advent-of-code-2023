package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

type gameStruct struct {
	gameId int
	red int
	green int
	blue int
}


func gameStructCreate()[]gameStruct{
	file, err := os.Open("input.txt")
	if err != nil {
			fmt.Println("Error opening file:", err)
	}
	defer file.Close();
	// Create a scanner to read the file line by line
    scanner := bufio.NewScanner(file)
		var games []gameStruct
    // Read the file line by line
    for scanner.Scan() {
        line := scanner.Text()
				
				gameParts := strings.Split(line, ":")
				gameData := strings.Split(gameParts[1], ";")
				fmt.Print(gameData)
				gameIDStr := strings.TrimSpace(gameParts[0])

				// Extracting the number after "Game"
						gameIDStr = strings.TrimPrefix(gameIDStr, "Game ")
						gameID, _ := strconv.Atoi(gameIDStr)
				
				
				game := gameStruct{
					gameId: gameID,
				}

			for _, data := range gameData {
				data = strings.TrimSpace(data)
				if strings.Contains(data, "blue") {
					blueStr := strings.Fields(data)
					blue, _ := strconv.Atoi(blueStr[0])
					game.blue += blue
				}
				if strings.Contains(data, "green") {
					greenStr := strings.Fields(data)
					green, _ := strconv.Atoi(greenStr[0])
					game.green += green
				}
				if strings.Contains(data, "red") {
					redStr := strings.Fields(data)
					red, _ := strconv.Atoi(redStr[0])
					game.red += red
				}
			}
			games = append(games, game)
		}

		
    

    // Check for any errors during scanning
    if err := scanner.Err(); err != nil {
        fmt.Println("Error reading file:", err)
    }
		return games
}
func main(){
	var games = gameStructCreate();
	var results []int;
	var total int;
	// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
	for i := 0; i < len(games); i++ {
		if(games[i].red <= 12 && games[i].green <= 13 && games[i].blue <= 14){
			results = append(results, games[i].gameId)
		}	
	}

	for i := 0; i < len(results); i++ {
		total = total + results[i]
	}

	fmt.Println(results)
	fmt.Println(total)
	// In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

	// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
	// fmt.Println(games)
}