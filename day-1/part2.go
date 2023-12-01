package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"

	// "strconv"
	"strings"
)

type MatchResult struct {
	NumString []string
	AmountOfMatches int
	MatchesPositions []int
}

func getStringNum(word string) MatchResult {

	str := string(word)
	 // Regular expression pattern to match number words without spaces
	 pattern := regexp.MustCompile(`(?i)(one|two|three|four|five|six|seven|eight|nine|ten)`)

	 matches := pattern.FindAllStringIndex(str, -1)
	 amountOfMatches := len(matches)
	 positions := make([]int, amountOfMatches*2)
	 var numString []string
	//  var word []int
	// fmt.Println(len(matches))
	//  fmt.Println("Positions of number words:")
	//  for _, match := range matches {
	// 		 fmt.Printf("%s found at positions %d to %d\n", str[match[0]:match[1]], match[0], match[1]-1)
	//  }
	 for i, match := range matches {
		numString = append(numString, str[match[0]:match[1]])
		positions[i*2] = match[0]
		positions[i*2+1] = match[1] - 1 // -1 to get the last index of the match
	}
	 return MatchResult{NumString: numString, AmountOfMatches: amountOfMatches, MatchesPositions: positions}
}

var numberWords = map[string]int{
	"zero":  0,
	"one":   1,
	"two":   2,
	"three": 3,
	"four":  4,
	"five":  5,
	"six":   6,
	"seven": 7,
	"eight": 8,
	"nine":  9,
}

func stringToInt(word string) (int) {
	word = strings.ToLower(word)
	if val, ok := numberWords[word]; ok {
		return val
	}
	return 0;
}

func getCalibrationDataStoreInSlicePart2() []int{
	var calibrationValues []int;
	// Open the file
	file, err := os.Open("input.txt")
	if err != nil {
			fmt.Println("Error opening file:", err)
			return calibrationValues
	}
	defer file.Close();
	// Create a scanner to read the file line by line
    scanner := bufio.NewScanner(file)

    // Read the file line by line
    for scanner.Scan() {
        line := scanner.Text()
				fmt.Println(line)
				data := getStringNum(line)
				// Regular expression pattern to match any sequence of digits
				pattern := regexp.MustCompile(`\d+`)
				// Find the first and last digits in the string
				firstMatch := pattern.FindStringIndex(line)
				lastMatch := pattern.FindStringIndex(reverseString(line))
				if firstMatch != nil && lastMatch != nil {
					firstIndex := firstMatch[0]
					lastIndex := len(line) - lastMatch[0] - 1
			
					firstDigit := line[firstIndex]
					lastDigit := line[lastIndex]
					var firstWord string
					var lastWord string
					var together string

					

					for i := 0; i < data.AmountOfMatches; i++ {
						// if(data.AmountOfMatches > 1){}
						if(data.AmountOfMatches == 1){
							if(data.MatchesPositions[i] > firstIndex){
								numString := string(data.NumString[i])
								firstWord = string(stringToInt(numString))
								if(data.MatchesPositions[len(data.MatchesPositions) - 1] > lastIndex){
									lastNumString := string(data.NumString[len(data.NumString)])
									lastWord = string(stringToInt(lastNumString))
									together = firstWord+lastWord
								}else{
									together = firstWord + string(lastDigit)
								}
							}else{
								if(data.MatchesPositions[len(data.MatchesPositions) - 1] > lastIndex){
									together = string(firstDigit) + lastWord				
								}else{
									together = string(firstDigit) + string(lastDigit)
								}
							}
						}else{
							together = string(firstDigit) + string(lastDigit)
						}
					
					}
					fmt.Println(together)
					// Convert string to integer
					// together_num, err := strconv.Atoi(together)
					// if err != nil {
					// 		fmt.Println("Error:", err)
					// 		return calibrationValues
					// }
					// calibrationValues = append(calibrationValues, together_num)
				} else {
					fmt.Println("No digits found in the string.")
				}
				
    }

    // Check for any errors during scanning
    if err := scanner.Err(); err != nil {
        fmt.Println("Error reading file:", err)
    }


		return calibrationValues;
}