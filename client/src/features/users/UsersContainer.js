import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import UserListShow from './UserListShow'
import { Typography, Grid, ToggleButton, ToggleButtonGroup, Box, TextField, } from '@mui/material'

export default function UsersContainer() {
	const { entities, status } = useSelector((state) => state.allUsers)
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

	const otherUsers = useMemo(() => {
		if (user) {
			return [...[...entities].filter((u) => u.id !== user.id)]
		} else {
			return [...entities]
		}
	}, [entities, user])

	const alphabetical = (users) => 
		[...users].sort((a, b) => a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name))
		//ORIGINAL PLAN FOR SORTING, THO ONLY BY LAST NAME.
		// [...users].map((user) => 
		// 	`${user.last_name} ${user.id}`)
		// .sort()
		// .map((nameId) => 
		// 	users.find((user) => 
		// 	parseInt(user.id) === parseInt(nameId.replace(/^\w.+\s/, ""))
		// )
	

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
		if (toSort.length === 0) {
			return 0
		} else {
			let newest = sortArr[0]
			let newestCreatedAt = Date.parse(newest.created_at)
			return newestCreatedAt
		}
	}

	const recentlyCommented = (users) => {
		let toSort = [...users]
		let sortArr = toSort.sort((a, b) => newestComment(b) - newestComment(a))
		return sortArr
	}
	
	const [allUserOrder, setAllUserOrder] = useState("alphabetical")

	const handleAllUserOrder = (event, newOrder) => {
		setAllUserOrder(newOrder)
	}

	const [filteredUsers, setFilteredUsers] = useState([...otherUsers])

	useEffect(() => {if (otherUsers.length > 0) setFilteredUsers([...otherUsers])}, [otherUsers])

	const handleSearch = (e) => {
		let keyword = e.target.value.toLowerCase()
		if (keyword === "") {
			setFilteredUsers(otherUsers)
		} else {
			let results = otherUsers.filter((u) => 
					u.username.toLowerCase().includes(keyword) ||
					u.name.toLowerCase().includes(keyword) ||
					u.bio.toLowerCase().includes(keyword) 
			)
			setFilteredUsers(results)
		}
	}

	const renderUsers = () => {
		let rawArr = [...filteredUsers]
		let arrTwo = []
		if (allUserOrder === "alphabetical") {
			arrTwo = [...alphabetical(rawArr)]
		} else if (allUserOrder === "recentlyAdded") {
			arrTwo = [...recentlyJoined(rawArr)]
		} else if (allUserOrder === "recentComment") {
			arrTwo = [...recentlyCommented(rawArr)]
		}
		let toMap = [...arrTwo]
		let mappedArr = toMap.map((u => <UserListShow key={u.id} showUser={u} />))
		return mappedArr
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
					<Typography variant="h2" justify="center" sx={{pt:4, pb:3, fontWeight: 410 }}>Members</Typography>
			</Grid>
			<Grid item xs={9}>

			</Grid>
			<Grid 
				item xs={12} sm={10} md={9}
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
								{/* TODO: Dry up this code by mapping through an array of options */}
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
									Recently Joined
								</ToggleButton>
								<ToggleButton 
									value="recentComment"
									aria-label="Most recent comment"
								>
									Recent Activity
								</ToggleButton>
							</ToggleButtonGroup>
							<br/>
							<TextField 
								id="search"
								label="Search"
								variant="filled"
								sx={{ m: 2, mt: 3, width: "50%" }}
								onChange={e => handleSearch(e)}
							/>
						</Box>
						{renderUsers()}
					</div>
				: 
					<div className="centered-in-window" >
							<div className="dot-flashing"></div>
					</div>
				}
			</Grid>
		</Grid>
 	)
}