import { useSelector } from 'react-redux'
// import { useState } from 'react'
import LitTextListShow from "./LitTextListShow"
import { Typography, Grid } from '@mui/material'


export default function LitTextsContainer () {
  const { entities, status } = useSelector((state) => state.litTexts)

	// const [filteredBy, setFilteredBy] = useState(entities) 
	// const [arrangedBy, setArrangedby] = useState(filteredBy)



	const renderLitTexts = entities.map((text) => <LitTextListShow key={text.id} litText={text} />)




  return (
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={9} 
				align="center" 
				justify="center">
					<Typography variant="h2" justify="center" sx={{pt:3}}>Library</Typography>
			</Grid>
			<Grid item xs={9}>

			</Grid>
			<Grid 
				item xs={9}
				>
				{status === "idle" ? 
					<div>
						{renderLitTexts}
					</div>
				: status === "loading" ?
					<div className="centered-in-window" >
							<h1>Loading...</h1>
					</div>
				: <div className="centered-in-window" >
							<h1>We're sorry. There's been an error</h1>
					</div>
				}
			</Grid>
		</Grid>
	)
}