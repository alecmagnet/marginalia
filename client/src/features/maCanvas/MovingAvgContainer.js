import { useState, useEffect, useCallback } from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { defaultPricesObj } from './defaultPrices'
import MovingAvgCanvas from './MovingAvgCanvas'

export default function MovingAvgContainer() {
	const [prices, setPrices] = useState([])
	const [error, setError] = useState(false)
	const [daysAgo, setDaysAgo] = useState(0)

	const makeClosingPricesArr = useCallback((obj1, bool) => {
		let result = []
		let obj = obj1['Time Series (Daily)']
		for (const property in obj) {
			result.push({
				date: property, 
				price: Number(obj[property]['4. close'])
			})
		}
		setError(bool)
		setPrices(result)
	}, [])

	const fetchPrices = useCallback(() => {
		fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		.then(response => {
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
	}, [makeClosingPricesArr])

	useEffect(() => {
		fetchPrices()
	}, [fetchPrices])

	const handleDayClick = (direction) => {
		const addend = direction === "back" ? 1 : -1
		setDaysAgo(prev => prev + addend)
	}

	const buttonArr = [
		{
			val: 'back',
			icon: <ArrowBackIosNewIcon />,
			limit: daysAgo >= 59,
		},
		{
			val: 'forward',
			icon: <ArrowForwardIosIcon />,
			limit: daysAgo === 0,
		},
	]

	return (
		<Grid container justifyContent='center' spacing={1}>
			<Grid item xs={12}>
				<Typography variant='h3' textAlign='center' sx={{ mt: 4, mb: 1 }}>
					IBM Closing Prices
				</Typography>
			</Grid>

			<Grid item xs={12} textAlign='center' >
				{buttonArr.map((elem, index) => 
					<IconButton
						key={index}
						disabled={elem.limit}
						onClick={() => handleDayClick(elem.val)}
					>
						{elem.icon}
					</IconButton>				
				)}
			</Grid>

			{error ? 
				<Grid item xs={12}>
					<Typography variant='h5' textAlign='center'>
						We could not fetch the latest data 
					</Typography>
					<Typography variant='subtitle1' textAlign='center'>	
						We’re sorry. Please try again in 5 minutes. Until then, here is our most recent stored data
					</Typography>
				</Grid>
			: null}

			{prices.length > 0 ? <MovingAvgCanvas prices={prices} daysAgo={daysAgo} /> : null}
		</Grid>
	)
}