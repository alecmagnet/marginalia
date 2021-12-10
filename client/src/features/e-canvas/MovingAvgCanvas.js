import { useRef, useEffect, useCallback } from 'react'
import { Typography, Box, Grid } from '@mui/material'

export default function MovingAvgCanvas({ prices, daysAgo = 0, days = 20, interval = 20 }) {
	// TO MAKE THIS COMPONANT MORE DYNAMIC, I WOULD SET STATE FOR THE DATE-RANGE
	// OF THE GRAPH AND THE INTERVAL OF THE MOVING AVERAGE, THEN INCLUDE INPUTS 
	// TO SET THOSE STATES

	const canvasRef = useRef()

	const drawGraph = useCallback((arr, context, canvas) => {
		let dataArr = []
		let maxVal = 0
		let minVal = arr[0].price

		for (let i = days + daysAgo - 1; i >= daysAgo; i--) {
			let sum = 0
			for (let j = i; j < i + interval; j++) {
				sum += arr[j].price
			}
			let movAvg = sum/interval
			maxVal = Math.max(maxVal, movAvg, arr[i].price)
			minVal = Math.min(minVal, movAvg, arr[i].price)
			let trimmedDate = () => {
				if (i % 2 !== 0) {return ''}
				else {return arr[i].date.substring(5).replaceAll('0', '').replace('-', '/')}
			}
			dataArr.push({
				date: trimmedDate(),
				price: arr[i].price,
				movAvg,
			})
		}

		const step = 5
		// I'VE CHOSEN TO BREAK MY Y-AXIS INTO MULTIPLES OF FIVE. 
		// TO DO: FIGURE OUT HOW TO MAKE THAT STEP SIZE DYNAMIC 
		// BASED ON THE SIZE OF THE DIFF BETWEEN MAX & MIN.
		const valMax = Math.ceil(maxVal/step)*step + step
		const valMin = Math.floor(minVal/step)*step - step
		context.font = "40 pt Verdana"

		const columnSize = 50
		const rowSize = 50
		const margin = 10	

		const yScale = (canvas.height - columnSize - margin) / (valMax - valMin)
		const xScale = (canvas.width - rowSize) / days

		context.clearRect(0, 0, canvas.width, canvas.height)
		context.strokeStyle="#cfd8dc"; 
		context.beginPath();
		for (let i=1; i<days; i++) {
			const x = i * xScale
			const monthDay = dataArr[i].date
			context.fillText(monthDay, x, columnSize - margin)
			context.moveTo(x, columnSize)
			context.lineTo(x, canvas.height - margin)
		}

		let count = 0
		for (let scale = valMax; scale >= valMin; scale = scale - step) {
			let y = columnSize + (yScale * count * step)
			context.fillText(scale, margin, y + margin)
			context.moveTo(rowSize, y)
			context.lineTo(canvas.width, y)
			count++;
		}
		context.stroke()
		
		context.translate(rowSize, canvas.height + valMin * yScale)
		context.scale(1, -1 * yScale)

		const plotData = (dataType) => {
			context.beginPath()
			context.moveTo(0, dataArr[0][dataType])
			for (let i=1; i<days; i++) {
				context.lineTo(i * xScale, dataArr[i][dataType])
			}
			context.stroke()
		}

		context.strokeStyle="#4a148c";
		plotData("price");
		context.strokeStyle="#880e4f";
		plotData("movAvg");
	}, [days, daysAgo, interval])

	useEffect(() => {
		const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
		drawGraph(prices, ctx, canvas)
	}, [drawGraph, prices])

	return (
		<Grid item xs="auto" sx={{ pt: 2, }}>
			<canvas
				ref={canvasRef}
				width='900px'
				height='600px'
			/>
			<Typography variant="h5" alignText="center" sx={{ mt: 1 }}>
				<Box component="span" sx={{ color: "#4a148c", mr: 3}}>
					Closing Price
				</Box>
				<Box component="span" sx={{ color: "#880e4f", ml: 3}}>
					20-Day Moving Average
				</Box>
			</Typography>
		</Grid>
	)
}