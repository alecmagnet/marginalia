import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Grid, Box, ToggleButton, ToggleButtonGroup, } from '@mui/material'

export default function NewHomepage() {
	const initialState = () => []
	const initialComs = () => "coms"
	const [comments, setComments] = useState(initialState())
	const [litTexts, setLitTexts] = useState(initialState())
	const [comsOrTexts, setComsOrTexts] = useState(initialComs())
	const history = useHistory()

	const getComments = () => {
		fetch('/recent_comments')
		.then(r => r.json)
		.then(data => setComments(() => data))
	}

	const getLitTexts = () => {
		fetch('/recent_lit_texts')
		.then(r => r.json)
		.then(data => setLitTexts(() => data))
	}

	useEffect(() => {
		getComments()
		getLitTexts()
	}, [])

	const handleComsOrTexts = (event, newOrder) => {
		setComsOrTexts(() => newOrder)
	}

	const toggleArr = [
		["coms", "Newest Comments"],
		["texts", "Recently Added Texts"]
	]


	return(
		<>
			{/* //BUTTONS TO LOGIN & SIGNUP OR LITTEXTS AND USERS */}

			<Typography id="top" variant="h2" justify="center" sx={{ pt:4, pb:3, fontWeight: 410 }}>Recent Activity</Typography>

			{comments.length > 0 && litTexts.length >0 ?
				<>
					<Box textAlign="center">
						<ToggleButtonGroup
							exclusive
							value={comsOrTexts}
							onChange={handleComsOrTexts}
							aria-label="Newest comments or recent texts"
							sx={{ bgcolor: "#fffaf5", }}
						>
							{toggleArr.map(el => {return (
								<ToggleButton 
									value={el[0]}
									aria-label={el[1]}
								>
									{el[1]}
								</ToggleButton>
							)})}
						</ToggleButtonGroup>
					</Box>

					{comsOrTexts === "coms" ? 
						<>
							
							{/* RECENT COMMENTS */}
						
						</>
					:
						<>
							
							{/* RECENT LITTEXTS */}
						
						</>
					}
				</>
			: 
				<div className="centered-in-window" >
						<div className="dot-flashing"></div>
				</div>
			}					
		</>
	)
}