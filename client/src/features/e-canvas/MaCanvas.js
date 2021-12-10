import { useState, useRef, useEffect, useCallback } from 'react'
import { Grid, Typography, } from '@mui/material'
import { defaultPricesObj } from './defaultPrices'

export default function MaCanvas() {
	const [prices, setPrices] = useState([])
	const [error, setError] = useState(false)
	const canvasRef = useRef()

	// If my fetch request returned a lot more data, I would use 
	// Object.entries (maybe with .slice?) to iterate over just 
	// the graph's date-range instead of the whole object
	const getClosingPricesArr = useCallback((obj) => {
		let result = []
		for (const property in obj) {
			result.push([property, Number(obj[property]["4. close"])])
		}
		return result
	}, [])

	const fetchPrices = useCallback(() => {
		fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		.then(response => response.json())
		.then(data => {
			setPrices(() => getClosingPricesArr(data["Time Series (Daily)"]))
			setError(() => false)
		})
		.catch(error => {
			console.log(error)
			setPrices(() => getClosingPricesArr(defaultPricesObj["Time Series (Daily)"]))
			setError(() => true)
		})
	}, [getClosingPricesArr])

	useEffect(() => {
		// fetchPrices()
		setPrices(() => getClosingPricesArr(defaultPricesObj["Time Series (Daily)"]))
		const canvas = canvasRef.current
    const context = canvas.getContext('2d')
	}, [fetchPrices, getClosingPricesArr])

	

	const makeSmaArr = (arr, daysAgo = 0, window = 20, interval = 20) => {
		let result = []
		// I'm using this for-loop + push instead of splice + reverse + map because the time complexity is O(n), versus 0(n)*3 
		for (let i = window + daysAgo - 1; i >= daysAgo; i--) {
			let sum = 0
			for (let j = i; j < i + interval; j++) {
				sum += Number(arr[j][1])
			}
			result.push([...arr[i], sum/interval])
		}
		return result
	}

	if (prices.length > 0) console.log("makeSmaArr", makeSmaArr(prices))

	const displayErrorMessage = () => {
		return (
			<Grid item xs={12}>
				<Typography variant="h5" textAlign="center">
					We could not fetch the latest data 
				</Typography>
				<Typography variant="subtitle2" textAlign="center">	
					We’re sorry. Please try again in 5 minutes. Until then, here is our most recent stored data
				</Typography>
			</Grid>
		)
	}


	return (
		<Grid container justifyContent="center" spacing={2}>
			<Grid iten xs={12}>
				<Typography variant="h3" textAlign="center" sx={{ mt: 4 }}>
					IBM Closing Prices
				</Typography>
			</Grid>
			<Grid item xs="auto" sx={{ pt: 2, }}>

				{error ? displayErrorMessage() : null}

				<canvas
					ref={canvasRef}
					style={{ 
						width: '800px', 
						height: '500px', 
						borderStyle: "solid", 
						// borderColor: ""
					}}
				>

				</canvas>
			</Grid>
		</Grid>
	)


}