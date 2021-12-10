import { Grid, Typography, } from '@mui/material'

export default function ErrorMessage() {
	return (
		<Grid item xs={12}>
			<Typography variant="h5" textAlign="center">
				We could not fetch the latest data 
			</Typography>
			<Typography variant="subtitle1" textAlign="center">	
				We’re sorry. Please try again in 5 minutes. Until then, here is our most recent stored data
			</Typography>
		</Grid>
	)
}
