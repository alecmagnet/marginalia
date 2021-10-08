import { useState } from 'react'
import { useSelector } from 'react-redux'
import UserListShow from './UserListShow'
import { Typography, Grid, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'

export default function UsersContainer() {
	const { entities, status } = useSelector((state) => state.allUsers)
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

	const toFilterUsers = [...entities]
	const otherUsers = toFilterUsers.filter((u) => u.id !== user.id)

	const alphabetical = (users) => {
		let toSort = [...users]
		let sortArr = toSort.sort((a, b) => {
			let lastNameA = a.fullname.replace(/^\w.+\s/, "")
			let lastNameB = b.fullname.replace(/^\w.+\s/, "")
			return lastNameA - lastNameB
		})
		return sortArr
	}

	const recentlyJoined = (users) => {
		let toSort = [...users]
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

	const recentlyCommented = (users) => {
		let toSort = [...users]
		let sortArr = toSort.sort((a, b) => newestComment(b) - newestComment(a))
		let topFour = sortArr.slice(0,4)
		return topFour
	}
	
	const [ allUserOrder, setAllUserOrder ] = useState("alphabetical")

	const handleAllUserOrder = (event, newOrder) => {
		setAllUserOrder(newOrder)
	}

	const renderUsers = () => {
		if (allUserOrder === "alphabetical") {
			let rawArr = [...otherUsers]
			let arrTwo = [...alphabetical(rawArr)]
			let toMap = [...arrTwo]
			let mappedArr = toMap.map((u => <UserListShow key={u.id} showUser={u} />))
			return mappedArr
		} else if (allUserOrder === "recentlyAdded") {
			let rawArr = [...otherUsers]
			let arrTwo = [...recentlyJoined(rawArr)]
			let toMap = [...arrTwo]
			let mappedArr = toMap.map((u => <UserListShow key={u.id} showUser={u} />))
			return mappedArr
		} else if (allUserOrder === "recentComment") {
			let rawArr = [...otherUsers]
			let arrTwo = [...recentlyCommented(rawArr)]
			let toMap = [...arrTwo]
			let mappedArr = toMap.map((u => <UserListShow key={u.id} showUser={u} />))
			return mappedArr
		}
	}
	
	return(
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={9} 
				align="center" 
				justify="center">
					<Typography variant="h2" justify="center" sx={{pt:4, pb:3, }}>Users</Typography>
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
								value={allUserOrder}
								exclusive
								onChange={handleAllUserOrder}
								aria-label="Arrange Users"
								sx={{ bgcolor: "#fffaf5", }}
							>
								<ToggleButton 
									value="alphabetical"
									aria-label="Alphabetical"
								>
									Alphabetical
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
						{renderUsers()}
					</div>
				: 
					<div className="centered-in-window" >
							<h1>Loading...</h1>
					</div>
				// : <div className="centered-in-window" >
				// 			<h1>We're sorry. There's been an error</h1>
				// 	</div>
				}
			</Grid>
		</Grid>
 	)
}