import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import LitTextListShow from "./LitTextListShow"
import LitTextNewForm from './LitTextNewForm'
import OrderDropdown from './dropdowns/OrderDropdown'
import { Typography, Grid, TextField, Button, Tooltip } from '@mui/material'
import FilterDropdown from './dropdowns/FilterDropdown'


export default function LitTextsContainer () {
	const [newClicked, setNewClicked] = useState(false)
	const handleNewClick = () => {
		setNewClicked(prev => !prev)
	}

  const { entities, status } = useSelector((state) => state.litTexts)
	const litTextsArr = [...entities]

	const authorAZ = (texts) => 
		[...texts].map((text) => 
			`${text.last_name} ${text.id}`
		).sort()
		.map((auth) => 
			texts.find((text) => 
				parseInt(text.id) === parseInt(auth.replace(/^\w.+\s/, ""))
			)
		)

	const titleAZ = (texts) => 
		[...texts].map((text) => 
			`${text.title} ${text.id}`
		)
		.sort()
		.map((title) => 
			texts.find((text) => 
				parseInt(text.id) === parseInt(title.replace(/^\w.+\s/, ""))
			)
		)

	const byPubdate = (texts) => 
		[...texts].sort((a, b) => 
			a.pubdate - b.pubdate
		)

	const recentlyAdded = (texts) => 
		[...texts].sort((a, b) => 
			Date.parse(b.created_at) - Date.parse(a.created_at)
		)

	const newestComment = (text) => {
		const sorted = [...text.comments].sort((a, b) => 
			Date.parse(b.created_at) - Date.parse(a.created_at)
		)
		return sorted.length === 0 ? 0 : Date.parse(sorted[0].created_at)
	}
	const recentlyCommented = (texts) => 
		[...texts].sort((a, b) => 
			newestComment(b) - newestComment(a)
		)
	
	const [litTextsOrder, setLitTextsOrder] = useState("authorA-Z")
	const handleLitTextsOrder = (e) => {
		setLitTextsOrder(e.target.value)
	}

	const [filteredLitTexts, setFilteredLitTexts] = useState([...litTextsArr])
	useEffect(() => {if (litTextsArr.length > 0) {
		setFilteredLitTexts([...litTextsArr])
	}}, [entities])

	const handleSearch = (e) => {
		let keyword = e.target.value.toLowerCase()
		if (keyword === "") {
			setFilteredLitTexts(litTextsArr)
		} else {
			let results = litTextsArr.filter((lt) => 
					lt.title.toLowerCase().includes(keyword) ||
					lt.author.toLowerCase().includes(keyword) ||
					lt.pubdate.toString().toLowerCase().includes(keyword) ||
					lt.content.toLowerCase().includes(keyword)
			)
			setFilteredLitTexts(results)
		}
	}

	const [poetryProseValue, setPoetryProseValue] = useState("all") 
	const handlePoetryProseValue = (e) => {
		setPoetryProseValue(e.target.value)
	}
	const filterRawArr = (rawArr) => {
		let formArr = [...rawArr]
		if (poetryProseValue === "poetry") {
			formArr = [...filteredLitTexts].filter(text => text.prose === false)
		} else if (poetryProseValue === "prose") {
			formArr = [...filteredLitTexts].filter(text => text.prose === true)
		} 
		return formArr
	}

	const renderLitTexts = () => {
		let rawArr = [...filteredLitTexts]
		let filtArr = filterRawArr(rawArr)
		let arrTwo = []
		if (litTextsOrder === "authorA-Z") {
			arrTwo = [...authorAZ(filtArr)]
		} else if (litTextsOrder === "authorZ-A") {
			arrTwo = [...authorAZ(filtArr).reverse()]
		} else if (litTextsOrder === "titleA-Z") {
			arrTwo = [...titleAZ(filtArr)]
		} else if (litTextsOrder === "titleZ-A") {
			arrTwo = [...titleAZ(filtArr).reverse()]
		} else if (litTextsOrder === "dateNew") {
			arrTwo = [...byPubdate(filtArr)]
		} else if (litTextsOrder === "dateOld") {
			arrTwo = [...byPubdate(filtArr).reverse()]
		} else if (litTextsOrder === "activityNew") {
			arrTwo = [...recentlyCommented(filtArr)]
		} else if (litTextsOrder === "activityOld") {
			arrTwo = [...recentlyCommented(filtArr).reverse()]
		} else if (litTextsOrder === "addedNew") {
			arrTwo = [...recentlyAdded(filtArr)]
		} else if (litTextsOrder === "addedOld") {
			arrTwo = [...recentlyAdded(filtArr).reverse()]
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
					<Typography id="top" variant="h2" justify="center" sx={{ pt:4, pb:3, fontWeight: 410 }}>Library</Typography>
			</Grid>
			<Grid item xs={9}>

			</Grid>
			<Grid 
				item xs={9}
				>
				{status === "loading" ?
					<div className="centered-in-window" >
							<h1>Loading...</h1>
					</div>
				:
				<div>
						<div style={{ display:"flex", justifyContent:"center", marginBottom: "32px" }}>
							<OrderDropdown 
								litTextsOrder={litTextsOrder} 
								handleLitTextsOrder={handleLitTextsOrder} 
							/>
							<FilterDropdown
								poetryProseValue={poetryProseValue}
								handlePoetryProseValue={handlePoetryProseValue}
							/>
							<TextField 
								id="search"
								label="Search"
								variant="filled"
								sx={{ mt: "8px", mb: 2, ml: 2, width: "36%" }}
								onChange={e => handleSearch(e)}
							/>
							<Tooltip title="Add New Story or Poem" arrow>
								<Button
									onClick={() => handleNewClick()} 
									variant="contained"
									sx={{ ml: 2, mt: "8px", p: 0, height: "62px" }}
								>
									<Typography variant="body2" sx={{ fontColor: "#fefcf9", fontSize: "40px", marginTop: "0px", fontWeight: "999"}}>+</Typography>
								</Button>
							</Tooltip>
						</div>

								{newClicked ? 
									<LitTextNewForm 
										handleNewClick={handleNewClick} 
										handleLitTextsOrder={handleLitTextsOrder} 
										handlePoetryProseValue={handlePoetryProseValue}
									/> 
								: null}
			
						{renderLitTexts()}

					</div>
				}
			</Grid>
		</Grid>
	)
}