import { useState, useRef, useEffect, useCallback } from 'react'
import { Grid, Typography, } from '@mui/material'
import { defaultPricesObj } from './defaultPrices'
import ErrorMessage from './ErrorMessage'

export default function MaCanvas() {
	const [prices, setPrices] = useState([])
	const [error, setError] = useState(false)
	const canvasRef = useRef()

	// If my fetch request returned a lot more data, I would use 
	// Object.entries (maybe with .slice?) to iterate over just 
	// the graph's date-range instead of the whole object
	const makeClosingPricesArr = useCallback((obj1, bool) => {
		let result = []
		let obj = obj1["Time Series (Daily)"]
		for (const property in obj) {
			result.push([property, Number(obj[property]["4. close"])])
		}
		setPrices(result)
		setError(bool)
	}, [])

	const fetchPrices = useCallback(() => {
		fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		.then(response => response.json())
		.then(data => {
			makeClosingPricesArr(data, false)
		})
		.catch(error => { // CHANGE IF IF RESPONSE.OK!!!!
			console.log(error)
			makeClosingPricesArr(defaultPricesObj, true)
		})
	}, [makeClosingPricesArr])

	useEffect(() => {
		// fetchPrices()
		makeClosingPricesArr(defaultPricesObj, false)
		const canvas = canvasRef.current
    const context = canvas.getContext('2d')
	}, [fetchPrices, makeClosingPricesArr])

	

	const makeMaArr = (arr, daysAgo = 0, window = 20, interval = 20) => {
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

	if (prices.length > 0) console.log("makeMaArr", makeMaArr(prices))



	return (
		<Grid container justifyContent="center" spacing={2}>
			<Grid iten xs={12}>
				<Typography variant="h3" textAlign="center" sx={{ mt: 4 }}>
					IBM Closing Prices
				</Typography>
			</Grid>
			<Grid item xs="auto" sx={{ pt: 2, }}>

				{error ? <ErrorMessage/> : null}

				<canvas
					ref={canvasRef}
					style={{ 
						width: '800px', 
						height: '500px', 
						borderStyle: "solid", 
					}}
				>

				</canvas>
			</Grid>
		</Grid>
	)


}