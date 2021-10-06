import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserEditForm from './UserEditForm'
import { fetchUserById } from './showUserSlice'
import { Grid, Paper, Typography, Avatar, Button } from '@mui/material'


export default function UserShow() {
	const [editClicked, setEditClicked] = useState(false)
	
	const params = useParams()
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchUserById(params.id)), [])
	const { entities:showUser, status:showUserStatus } = useSelector((state) => state.showUser)
	const user = useSelector((state) => state.user.entities[0])

	function editButtonClick() {
		setEditClicked(!editClicked)
	}

	function updateUser(data) {
		// setShowUser(data) DISPATCH PATCH REQUEST HERE OR IN EDIT FORM?
		setEditClicked(!editClicked)
	}

	const msec = Date.parse(showUser.created_at)
  const parseDate = new Date(msec).toDateString()
  const trimDate = parseDate.slice(4)
  const splitDate = trimDate.split(" ")
  const renderDate = `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`


	// const renderLitTexts = user.comments ? user.comments.map((c) => console.log(c)) : null

	if (showUserStatus === "idle") {
		return (
    <Grid 
			container 
			justifyContent="Center"	
		>
			<Grid 
				item xs={9} sx={{ maxWidth: 850 }}
			>
				<Paper 
					elevation={9} 
					sx={{ p:3, m: 3, backgroundColor: "#fffaf5" }}
				>
					<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
					<Avatar 
						variant="rounded"
						alt={showUser.fullname}
						src={showUser.image}
						align="center"
						sx={{ width: 300, height: 300, m: 2, mb: 4, }}
					/>
					</div>
					<Typography variant="h4" sx={{ textAlign:"center" }}><b>{showUser.fullname}</b></Typography>
					<Typography variant="h6" sx={{ textAlign:"center", m: 1, mb: 2, }}><em>@{showUser.username}</em></Typography>
					<Typography variant="h5" sx={{ textAlign:"center", mt: 3, fontVariant: "small-caps", }} >Bio</Typography> 					
					<Typography variant="body1" sx={{ textAlign:"center", mb: 3 }} >{showUser.bio}</Typography> 
					<Typography variant="body2" sx={{ textAlign:"center", m: 1, mb: 5, color: "#373737"}}><em>Joined {renderDate}</em></Typography>
					{showUser.id === user.id ?
						<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
							<Button variant="contained" onClick={editButtonClick} >Edit</Button>
							{editClicked ?
								<UserEditForm 
								user={user}
								updateUser={updateUser} /> 
							: null}
						</div>
					: null}
				</Paper>
			</Grid>
		</Grid>
		)
	} else if (showUserStatus === "loading") {
		return (
			<h1>Loading...</h1>
		)
	} else {
		return (
			<h1>We're sorry. There's been an error.</h1>
		)
	}
}