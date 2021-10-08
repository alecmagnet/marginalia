import { useSelector } from 'react-redux'
import { useState } from 'react'
import LitTextListShow from "./LitTextListShow"
import { Typography, Grid, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'


export default function LitTextsContainer () {
  const { entities, status } = useSelector((state) => state.litTexts)

	const litTextsArr = [...entities]

	const authorAZ = (texts) => {
		let toMap = [...texts]
		let mappedArr = toMap.map((text) => `${text.author.replace(/^\w.+\s/, "")} ${text.id}`)
		let sortedAuthors = mappedArr.sort()
		let sortedArr = sortedAuthors.map((auth) => {
			let sortID = auth.replace(/^\w.+\s/, "")
			let sortText = toMap.find((text) => parseInt(text.id) === parseInt(sortID))
			return sortText
		})
		return sortedArr		
	}

	const titleAZ = (texts) => {
		let toMap = [...texts]
		let mappedArr = toMap.map((text) => `${text.title} ${text.id}`)
		let sortedTitles = mappedArr.sort()
		let sortedArr = sortedTitles.map((title) => {
			let sortID = title.replace(/^\w.+\s/, "")
			let sortText = toMap.find((text) => parseInt(text.id) === parseInt(sortID))
			return sortText
		})
		return sortedArr
	}

	const recentlyJoined = (texts) => {
		let toSort = [...texts]
		let sortArr = toSort.sort((a, b) => {
			let dateTimeA = Date.parse(a.created_at) 
			let dateTimeB = Date.parse(b.created_at)
			return dateTimeB - dateTimeA
		})
		return sortArr
	}

	const newestComment = (el) => {
		let toSort = [...el.comments]
		let sortArr = toSort.sort((a, b) => {
			let dateTimeA = Date.parse(a.created_at) 
			let dateTimeB = Date.parse(b.created_at)
			return dateTimeB - dateTimeA
		})
		if (sortArr.length === 0) {
			return 0
		} else {
			let newest = sortArr[0]
			// console.log(newest)
			let newestCreatedAt = Date.parse(newest.created_at)
			return newestCreatedAt
		}
	}

	const recentlyCommented = (texts) => {
		let toSort = [...texts]
		let sortArr = toSort.sort((a, b) => newestComment(b) - newestComment(a))
		return sortArr
	}
	
	const [ litTextsOrder, setLitTextsOrder ] = useState("authorAZ")

	const handleLitTextsOrder = (event, newOrder) => {
		setLitTextsOrder(newOrder)
	}

	const renderLitTexts = () => {
		let rawArr = [...litTextsArr]
		let arrTwo = []
		if (litTextsOrder === "authorAZ") {
			arrTwo = [...authorAZ(rawArr)]
		} else if (litTextsOrder === "titleAZ") {
			arrTwo = [...titleAZ(rawArr)]
		} else if (litTextsOrder === "recentlyAdded") {
			arrTwo = [...recentlyJoined(rawArr)]
		} else if (litTextsOrder === "recentComment") {
			arrTwo = [...recentlyCommented(rawArr)]
		}
		let toMap = [...arrTwo]
		let mappedArr = toMap.map((text) => <LitTextListShow key={text.id} litText={text} />)
		return mappedArr
	}
	

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
						<Box textAlign="center">
							<ToggleButtonGroup
								value={litTextsOrder}
								exclusive
								onChange={handleLitTextsOrder}
								aria-label="Arrange Users"
								sx={{ bgcolor: "#fffaf5", }}
							>
								<ToggleButton 
									value="authorAZ"
									aria-label="Author A-Z"
								>
									Author A-Z
								</ToggleButton>
								<ToggleButton 
									value="titleAZ"
									aria-label="Title A-Z"
								>
									Title A-Z
								</ToggleButton>
								<ToggleButton 
									value="recentlyAdded"
									aria-label="Most recently added"
								>
									Recently Added
								</ToggleButton>
								<ToggleButton 
									value="recentComment"
									aria-label="Most recent comment"
								>
									Recent Activity
								</ToggleButton>
							</ToggleButtonGroup>
						</Box>
						{renderLitTexts()}
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