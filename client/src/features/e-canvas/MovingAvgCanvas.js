import { useRef, useEffect, useCallback } from 'react'

export default function MovingAvgCanvas({ prices }) {
	// TO MAKE THIS COMPONANT MORE DYNAMIC, I WOULD SET STATE FOR DATE-RANGE
	// OF THE GRAPH AND THE INTERVAL OF THE MOVING AVERAGE, THEN INCLUDE INPUTS 
	// TO SET THOSE STATES

	const canvasRef = useRef()

	const findRange = useCallback((maxVal, minVal, mod = 1) => {

	})
	
	const makeMaArr = useCallback((arr, daysAgo = 0, dateRange = 20, interval = 20) => {
		let result = []
		let maxVal = 0
		let minVal = arr[0].close
		for (let i = dateRange + daysAgo - 1; i >= daysAgo; i--) {
			let sum = 0
			for (let j = i; j < i + interval; j++) {
				sum += arr[j].close
			}
			let movAvg = sum/interval
			maxVal = Math.max(maxVal, movAvg, arr[i].close)
			minVal = Math.min(minVal, movAvg, arr[i].close)
			result.push({
				...arr[i], 
				movAvg,
			})
		}
		return {
			priceAvgArr: result,
			maxVal,
			minVal,
		}
	}, [])

	const drawLine = useCallback((dataSet) => {
		context.beginPath();
		context.moveTo(0, dataSet[0]);
		for (i=1; i<sections; i++) {
			context.lineTo(i * xScale, dataSet[i]);
		}
		context.stroke();
	}, [])

	const init = useCallback(() => {
		const dataObj = makeMaArr(prices)
	}, [makeMaArr, drawLine])


	useEffect(() => {
		const canvas = canvasRef.current
    const context = canvas.getContext('2d')
	}, [])

	return (
		<canvas
			ref={canvasRef}
			style={{ 
				width: '800px', 
				height: '500px', 
				borderStyle: "solid", 
			}}
		>

		</canvas>
	)
}