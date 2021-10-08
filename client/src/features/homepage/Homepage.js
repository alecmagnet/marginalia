import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Grid, Box, Button, ToggleButton, ToggleButtonGroup, } from '@mui/material'
import LitTextListShow from '../litTexts/LitTextListShow'
import UserHomePageShow from '../users/UserHomePageShow.js'

export default function Homepage() {
  const litTextsState = useSelector((state) => state.litTexts)
	const allUsersState = useSelector((state) => state.allUsers)
	const getEntities = (state) => state.entities
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null
	const history = useHistory()

	let recentlyAdded = []
	if (litTextsState.status === "idle" && litTextsState.entities.length > 0) {
		let toSort = [...getEntities(litTextsState)]
		let toSortTwo = [...toSort]
		let sortArr = toSortTwo.sort((a, b) => {
			let dateTimeA = Date.parse(b.created_at) 
			let dateTimeB = Date.parse(a.created_at)
			return dateTimeB - dateTimeA
		})
		let sliceArr = sortArr.slice(0,4)
		recentlyAdded = sliceArr
	}

	let recentlyJoined = []
	if (allUsersState.status === "idle" && allUsersState.entities.length > 0) {
		let toSort = [...getEntities(allUsersState)]
		let toSortTwo = [...toSort]
		let sortArr = toSortTwo.sort((a, b) => {
			let dateTimeA = Date.parse(b.created_at) 
			let dateTimeB = Date.parse(a.created_at)
			return dateTimeB - dateTimeA
		})
		let sliceArr = sortArr.slice(0,4)
		recentlyJoined = sliceArr
	}

	const [ litTextOrder, setLitTextOrder ] = useState("recentlyAdded")
	const [ allUserOrder, setAllUserOrder ] = useState("recentlyAdded")

	const handleLitTextOrder = (event, newOrder) => {
		setLitTextOrder(newOrder)
	}

	const handleAllUserOrder = (event, newOrder) => {
		setAllUserOrder(newOrder)
	}

	const newestComment = (el) => {
		let sortArrRaw = [...el.comments]
		let sortArr = sortArrRaw.sort((a, b) => b.created_at - a.created_at)
		let newest = sortArr[0]
		return newest
	}

	const recentlyCommented = (arr) => {
		let sortArrRaw = [...arr]
		let sortArr = sortArrRaw.sort((a, b) => newestComment(b) - newestComment(a))
		let topFour = sortArr.slice(0,4)
		return topFour
	}

	const handleClickLitTexts = () => {
		history.push("/texts")
	}

	const handleClickAllUsers = () => {
		history.push("/users")
	}

	const renderLitTexts = () => {
		if (litTextOrder === "recentlyAdded") {
			let toMap = [...recentlyAdded]
			let mappedArr = toMap.map((lt) => <LitTextListShow key={lt.id} litText={lt} />)
			return mappedArr
		} else if (litTextOrder === "recentComment") {
			let rawArr = [...getEntities(litTextsState)]
			let arrTwo = recentlyCommented(rawArr)
			let toMap = [...arrTwo]
			let mappedArr = toMap.map((lt) => <LitTextListShow key={lt.id} litText={lt} />)
			return mappedArr
		}
	}

		const renderAllUsers = () => {
		if (allUserOrder === "recentlyAdded") {
			let toMap = [...recentlyJoined]
			let mappedArr = toMap.map((u) => <UserHomePageShow key={u.id} showUser={u} />)
			return mappedArr
		} else if (allUserOrder === "recentComment") {
			let rawArr = [...getEntities(allUsersState)]
			let arrTwo = recentlyCommented(rawArr)
			let toMap = [...arrTwo]
			let mappedArr = toMap.map((u) => <UserHomePageShow key={u.id} showUser={u} />)
			return mappedArr
		}
	}

	if (user && litTextsState.entities.length > 0 && allUsersState.entities.length > 0) {
		return(
			<Grid container spacing={2} justifyContent="center" >
				<Grid item
					xs={6}
					justifyContent="center"
					sx={{ mt: 5, }}
				>
					<Box sx={{ bgcolor:"primary.dark", }} >
						<Box
							onClick={handleClickLitTexts}
							sx={{ p: 3, cursor: "pointer", }}
						>
							<Typography 
								variant="h3"
								sx={{ color: "#fff", textAlign: "center", m: 1, }}
							>
								{"POEMS & STORIES"}
							</Typography>
							<Typography 
								variant="h6"
								sx={{ color: "#d9d9d9", textAlign: "center" }}
							>
								<em>View All</em>
							</Typography>
						</Box>
						<Box textAlign="center">
							<ToggleButtonGroup
								value={litTextOrder}
								exclusive
								onChange={handleLitTextOrder}
								aria-label="Arrange Poem and Story Previews"
								sx={{ bgcolor: "#fffaf5", }}
							>
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
						<Box textAlign="center">
							<Button
								sx={{ bgcolor: "#fffaf5", m: 2, mb: 4 }}
							>
								See More...
							</Button>
						</Box>
					</Box>
				</Grid>


				<Grid item
					xs={4}
					sx={{ mt: 5 }}
				>
					<Box sx={{ bgcolor:"primary.dark", }} >
						<Box
							onClick={handleClickAllUsers}
							sx={{ p: 3, cursor: "pointer", }}
						>
							<Typography 
								variant="h3"
								sx={{ color: "#fff", textAlign: "center", m: 1, }}
							>
								USERS
							</Typography>
							<Typography 
								variant="h6"
								sx={{ color: "#d9d9d9", textAlign: "center" }}
							>
								<em>View All</em>
							</Typography>
						</Box>
						<Box textAlign="center">
							<ToggleButtonGroup
								value={allUserOrder}
								exclusive
								onChange={handleAllUserOrder}
								aria-label="Arrange User Previews"
								sx={{ bgcolor: "#fffaf5", }}
							>
								<ToggleButton 
									value="recentlyAdded"
									aria-label="Most recently added"
								>
									Recently Joined
								</ToggleButton>
								<ToggleButton 
									value="recentComment"
									aria-label="Most recent comment"
								>
									Recent Activity
								</ToggleButton>

							</ToggleButtonGroup>
						</Box>
						{renderAllUsers()}

					</Box>
				</Grid>
 			</Grid>
		)
	} else {
		return(
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	}




	// return (
	// 	<div className="centered-in-window" >
	// 		<div className="centered-in-div" >
	// 			{/* <h1>Welcome to Marginalia</h1>
	// 			<div className="centered-in-div" style={{ width: "75%" }} >
	// 				<Link to='/texts'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Texts</h1></div></Link>
	// 				<p />
	// 				<Link to='/users'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Users</h1></div></Link>
	// 			</div> */}
	// 		</div>
	// 	</div>		
	// )
}