import { useState, useEffect, useCallback } from 'react'
import { Grid, Typography, } from '@mui/material'
import { defaultPricesObj } from './defaultPrices'
import MovingAvgCanvas from './MovingAvgCanvas'

export default function MovingAvgContainer() {
	const [prices, setPrices] = useState([])
	const [error, setError] = useState(false)

	const makeClosingPricesArr = useCallback((obj1, bool) => {
		let result = []
		let obj = obj1["Time Series (Daily)"]
		for (const property in obj) {
			result.push({
				date: property, 
				price: Number(obj[property]["4. close"])
			})
		}
		setError(bool)
		setPrices(result)
	}, [])

	const fetchPrices = useCallback(() => {
		fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		.then(response => {
			console.log(response)
			if (response.ok) {
				return response.json()
			} else {
				throw new Error('error')	
			}
		})
		.then(data => {
			makeClosingPricesArr(data, false)
		})
		.catch(error => { 
			if (error) {makeClosingPricesArr(defaultPricesObj, true)} 	
		}) 	
		// makeClosingPricesArr(defaultPricesObj, false)
	}, [makeClosingPricesArr])

	useEffect(() => {
		fetchPrices()
	}, [fetchPrices])


	return (
		<Grid container justifyContent="center" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h3" textAlign="center" sx={{ mt: 4 }}>
					IBM Closing Prices
				</Typography>

				{error ? 
					<Grid item xs={12}>
						<Typography variant="h5" textAlign="center">
							We could not fetch the latest data 
						</Typography>
						<Typography variant="subtitle1" textAlign="center">	
							We’re sorry. Please try again in 5 minutes. Until then, here is our most recent stored data
						</Typography>
					</Grid>
				: null}

			</Grid>
			{prices.length > 0 ? <MovingAvgCanvas prices={prices} /> : null}
		</Grid>
	)
}