package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

// Function to reverse a string
func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func getCalibrationDataStoreInSlice() []int{
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

					together := string(firstDigit) + string(lastDigit)
					// Convert string to integer
					together_num, err := strconv.Atoi(together)
					if err != nil {
							fmt.Println("Error:", err)
							return calibrationValues
					}
					calibrationValues = append(calibrationValues, together_num)
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