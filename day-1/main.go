package main



func main(){
	var calibrationDataSlice = getCalibrationDataStoreInSlice();
	var value int;
	for i := 0; i < len(calibrationDataSlice); i++ {
		value = value + calibrationDataSlice[i];
	}
	 getCalibrationDataStoreInSlicePart2();
	
}