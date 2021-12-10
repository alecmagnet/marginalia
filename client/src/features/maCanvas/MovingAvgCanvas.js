import { useRef, useEffect, useCallback, useState } from 'react'
import { Typography, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'

export default function MovingAvgCanvas({ prices, daysAgo = 0, days = 20, interval = 20 }) {
	// TO MAKE THIS COMPONANT MORE DYNAMIC, I WOULD SET STATE FOR THE DATE-RANGE
	// OF THE GRAPH AND THE INTERVAL OF THE MOVING AVERAGE, THEN INCLUDE INPUTS 
	// TO SET THOSE STATES
	const initialState = () => ['closing', 'mAvg']
	const [whichLines, setWhichLines] = useState(() => initialState())
	const canvasRef = useRef()

	const handleWhichLines = (event, newLines) => {
		setWhichLines(newLines)
	} 

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
		context.font = '17px Roboto'

		const columnSize = 50
		const rowSize = 50
		const margin = 10	

		const yScale = (canvas.height - columnSize - margin) / (valMax - valMin)
		const xScale = (canvas.width - rowSize) / days

		context.setTransform(1,0,0,1,0,0)
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.strokeStyle='#cfd8dc'
		context.beginPath()
		for (let k=1; k<=days; k++) {
			const x = k * xScale
			const monthDay = dataArr[k-1].date
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

		if (whichLines.includes('closing')) {
			context.strokeStyle='#4a148c'
			plotData('price')
		}
		if (whichLines.includes('mAvg')) {
			context.strokeStyle='#880e4f';
			plotData('movAvg');
		}
	}, [days, daysAgo, interval, whichLines])

	useEffect(() => {
		const cnvs = canvasRef.current
    const ctx = cnvs.getContext('2d')
		drawGraph(prices, ctx, cnvs)
	}, [drawGraph, prices])

	return (
		<Grid item container xs={12} justifyContent="center" >
			<Grid item xs='auto' >
				<canvas
					ref={canvasRef}
					width='1000px'
					height='450px'
				/>
			</Grid>
			<Grid item container xs={12} justifyContent="center" >
				<ToggleButtonGroup
					value={whichLines}
					onChange={handleWhichLines}
					aria-label='select which lines to graph'
					sx={{ my: 4, }}
				>
					<ToggleButton value='closing' aria-label='closing prices' sx={{ px:4 }}>
						<Typography variant='h5' textAlign='center' sx={{ color: '#4a148c', }}>
							Closing Price
						</Typography>
					</ToggleButton>
					<ToggleButton value='mAvg' aria-label='moving averages' sx={{ px:4 }}>
						<Typography variant='h5' textAlign='center' sx={{ color: '#880e4f', }}>
							20-Day Moving Average
						</Typography>					
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
		</Grid>
	)
}