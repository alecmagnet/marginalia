import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo, Fragment } from 'react'
import LitTextListShow from "./LitTextListShow"
import LitTextNewForm from './litTextNewForm/LitTextNewForm'
import OrderDropdown from './dropdowns/OrderDropdown'
import { Typography, Grid, TextField, Button, Tooltip, Paper } from '@mui/material'
import FilterDropdown from './dropdowns/FilterDropdown'


export default function LitTextsContainer () {
	const { entities, status } = useSelector((state) => state.litTexts)
	const litTextsArr = useMemo(() => {return [...entities]}, [entities])

	const initialFiltered = () => [...litTextsArr]
	const initialUnclicked = () => false
	const initialOrder = () => "author"
	const initialPPVal = () => "all"

	const [filteredLitTexts, setFilteredLitTexts] = useState(initialFiltered)
	const [newClicked, setNewClicked] = useState(initialUnclicked)
	const [isReversed, setIsReversed] = useState(initialUnclicked)
	const [litTextsOrder, setLitTextsOrder] = useState(initialOrder)
	const [poetryProseValue, setPoetryProseValue] = useState(initialPPVal) 
	
	useEffect(() => {if (litTextsArr.length > 0) {
		setFilteredLitTexts([...litTextsArr])
	}}, [litTextsArr])

	const handleNewClick = () => {
		setNewClicked(prev => !prev)
	}		
	const handleReverseClick = () => {
		setIsReversed(prev => !prev)
	}		
	const handleLitTextsOrder = (e) => {
		setLitTextsOrder(e.target.value)
		setIsReversed(() => false)
	}			
	const handlePoetryProseValue = (e) => {
		setPoetryProseValue(e.target.value)
	}		

	const handleOrderAfterNewTextAdd = () => {
		setLitTextsOrder(() => "added")
		setIsReversed(() => false)
		setPoetryProseValue(() => "all")
	} 		

	const authorAZ = (texts) => 
		[...texts].sort((a, b) => 
			a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name)
		)	

	const titleAZ = (texts) => 	
		[...texts].sort((a, b) => a.title.localeCompare(b.title)
		)

	const byPubdate = (texts) => 	
		[...texts].sort((a, b) => 
			b.pubdate - a.pubdate
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

	const filterRawArr = (rawArr) => {
		let formArr = [...rawArr]
		if (poetryProseValue === "poetry") {
			formArr = [...filteredLitTexts].filter(text => text.prose === false)
		} else if (poetryProseValue === "prose") {
			formArr = [...filteredLitTexts].filter(text => text.prose === true)
		} 
		return formArr
	}

	//TO-DO: Dry up this code by mapping through an array of options, if possible
	const renderLitTexts = () => {
		let filtArr = filterRawArr([...filteredLitTexts])
		let arrTwo = []
		if (litTextsOrder === "author" && !isReversed) {
			arrTwo = [...authorAZ(filtArr)]
		} else if (litTextsOrder === "author") {
			arrTwo = [...authorAZ(filtArr).reverse()]
		} else if (litTextsOrder === "title" && !isReversed) {
			arrTwo = [...titleAZ(filtArr)]
		} else if (litTextsOrder === "title") {
			arrTwo = [...titleAZ(filtArr).reverse()]
		} else if (litTextsOrder === "date" && !isReversed) {
			arrTwo = [...byPubdate(filtArr)]
		} else if (litTextsOrder === "date") {
			arrTwo = [...byPubdate(filtArr).reverse()]
		} else if (litTextsOrder === "activity" && !isReversed) {
			arrTwo = [...recentlyCommented(filtArr)]
		} else if (litTextsOrder === "activity") {
			arrTwo = [...recentlyCommented(filtArr).reverse()]
		} else if (litTextsOrder === "added" && !isReversed) {
			arrTwo = [...recentlyAdded(filtArr)]
		} else if (litTextsOrder === "added") {
			arrTwo = [...recentlyAdded(filtArr).reverse()]
		}
		return [...arrTwo].map((text) => <LitTextListShow key={text.id} litText={text} />)
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

			<Grid 
				container item xs={12} justifyContent="center"
				>
				{status === "loading" ?
					<div className="centered-in-window" >
							<div className="dot-flashing"></div>
					</div>
				:
					<Fragment>
						<div style={{ justifyContent:"center", marginBottom: "32px" }}>
							<Grid 
								container item xs={12} 
								columnSpacing={3} 
								rowSpacing={1}
								justifyContent="center"
								// sx={{ mt: "8px", mb: 2}}
							>
								<Grid item xs="auto">
									<OrderDropdown 
										litTextsOrder={litTextsOrder} 
										handleLitTextsOrder={handleLitTextsOrder} 
										handleReverseClick={handleReverseClick}
									/>
								</Grid>
								<Grid item xs="auto">
									<FilterDropdown
										poetryProseValue={poetryProseValue}
										handlePoetryProseValue={handlePoetryProseValue}
									/>
								</Grid>
								<Grid item xs={10} md>
										<TextField 
											elevation={1}
											id="search"
											label="Search"
											variant="filled"
											sx={{ width: "100%" }}
											onChange={e => handleSearch(e)}
										/>
								</Grid>
								<Grid item xs="auto">
										<Tooltip title="Add New Story or Poem" arrow>
											<Button
												onClick={() => handleNewClick()} 
												variant="contained"
												sx={{ height: "61.75px" }}
											>
												<Typography variant="body2" sx={{ fontColor: "#fefcf9", fontSize: "40px", marginTop: "0px", fontWeight: "999"}}>+</Typography>
											</Button>
										</Tooltip>
								</Grid>
							</Grid>
						</div>

						{newClicked ? 
							<LitTextNewForm 
								handleNewClick={handleNewClick} 
								handleLitTextsOrder={handleOrderAfterNewTextAdd} 
								handlePoetryProseValue={handlePoetryProseValue}
								isEdit={false}
								litText={null}
								reRender={null}
							/> 
						: null}

						{status === "error" ? <Typography variant="body2" sx={{ color: "#701010", textAlign: "center", my: 1 }}><b>We're sorry. There's been an error uploading your text.</b></Typography> : null}
			
						{renderLitTexts()}

					</Fragment>
				}
			</Grid>
		</Grid>
	)
}