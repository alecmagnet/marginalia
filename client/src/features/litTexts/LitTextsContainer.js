import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import LitTextListShow from "./LitTextListShow"
import LitTextNewForm from './LitTextNewForm'
import OrderDropdown from './dropdowns/OrderDropdown'
import { Typography, Grid, Box, TextField, Button, Tooltip } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import FilterDropdown from './dropdowns/FilterDropdown'
import { HashLink } from 'react-router-hash-link'


// FUTURE GOAL: REFACTOR THIS CODE INTO SMALLER COMPONENTS
export default function LitTextsContainer () {
	const [newClicked, setNewClicked] = useState(false)
	const handleNewClick = () => {
		setNewClicked(prev => !prev)
	}

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

	const recentlyAdded = (texts) => {
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
			let newestCreatedAt = Date.parse(newest.created_at)
			return newestCreatedAt
		}
	}

	const recentlyCommented = (texts) => {
		let toSort = [...texts]
		let sortArr = toSort.sort((a, b) => newestComment(b) - newestComment(a))
		return sortArr
	}

	
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
		// } else if (litTextsOrder === "dateNew") {
		// 	arrTwo = [...byPubdate(filtArr)]
		// } else if (litTextsOrder === "dateOld") {
		// 	arrTwo = [...byPubdate(filtArr).reverse()]
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
						<div style={{ display:"flex", justifyContent:"center", }}>
							<TextField 
								id="search"
								label="Search"
								variant="filled"
								sx={{ mt: 1, width: "45%" }}
								onChange={e => handleSearch(e)}
							/>
							<FilterDropdown
								poetryProseValue={poetryProseValue}
								handlePoetryProseValue={handlePoetryProseValue}
							/>
							<OrderDropdown 
								litTextsOrder={litTextsOrder} 
								handleLitTextsOrder={handleLitTextsOrder} 
							/>
						</div>

						<div style={{ display:"flex", justifyContent:"center", marginTop: 6, marginBottom: 9, paddingBottom: 2 }}>
							<Tooltip title="Add New Story or Poem" arrow>
								<Button
									onClick={() => handleNewClick()} 
									variant="contained"
									sx={{ py: 1, mt: 2, }}
								>
									<AddBoxIcon fontSize="large" fontColor="#fefcf9"/>
								</Button>
							</Tooltip>
						</div>

						{newClicked ? 
							<LitTextNewForm 
								handleNewClick={handleNewClick} 
								handleLitTextsOrder={handleLitTextsOrder} 
								handlePoetryProseValue={handlePoetryProseValue}
							/> : null}

						{renderLitTexts()}
						<div id="new" style={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "center"  }}>
							<HashLink smooth to="/texts#top">
							<Button 
								// onClick={handleNewClick}
								variant="contained"
								sx={{ mt: 2, mb: 4}}
							>
								Top
							</Button>
							</HashLink>
						</div>
					</div>
				}
			</Grid>
		</Grid>
	)
}