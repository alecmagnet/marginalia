import { useState, useEffect, useCallback } from 'react'
import { Grid, Typography, } from '@mui/material'
import { defaultPricesObj } from './defaultPrices'
import ErrorMessage from './ErrorMessage'
import MovingAvgCanvas from './MovingAvgCanvas'

export default function MovingAvgContainer() {
	const [prices, setPrices] = useState([])
	const [error, setError] = useState(false)

	// If my fetch request returned a lot more data, I would use 
	// Object.entries (maybe with .slice?) to iterate over just 
	// the graph's date-range instead of the whole object
	const makeClosingPricesArr = useCallback((obj1, bool) => {
		let result = []
		let obj = obj1["Time Series (Daily)"]
		for (const property in obj) {
			result.push({
				date: property, 
				price: Number(obj[property]["4. close"])
			})
		}
		setPrices(result)
		setError(bool)
	}, [])

	const fetchPrices = useCallback(() => {
		// fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		// .then(response => response.json())
		// .then(data => {
		// 	makeClosingPricesArr(data, false)
		// })
		// .catch(error => { // CHANGE TO IF RESPONSE.OK!!!!
		// 	console.log(error)
		// 	makeClosingPricesArr(defaultPricesObj, true)
		// })
		makeClosingPricesArr(defaultPricesObj, false)
	}, [makeClosingPricesArr])

	useEffect(() => {
		fetchPrices()
		// const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
	}, [fetchPrices])

	

	// const makeMaArr = (arr, daysAgo = 0, window = 20, interval = 20) => {
	// 	let result = []
	// 	// I'm using this for-loop + push instead of splice + reverse + map because the time complexity is O(n), versus 0(n)*3 
	// 	for (let i = window + daysAgo - 1; i >= daysAgo; i--) {
	// 		let sum = 0
	// 		for (let j = i; j < i + interval; j++) {
	// 			sum += arr[j][1]
	// 		}
	// 		result.push([...arr[i], sum/interval])
	// 	}
	// 	return result
	// }

	// if (prices.length > 0) console.log("makeMaArr", makeMaArr(prices))



	return (
		<Grid container justifyContent="center" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h3" textAlign="center" sx={{ mt: 4 }}>
					IBM Closing Prices
				</Typography>
				{error ? <ErrorMessage/> : null}
			</Grid>
			{prices.length > 0 ? <MovingAvgCanvas prices={prices} /> : null}
		</Grid>
	)
}