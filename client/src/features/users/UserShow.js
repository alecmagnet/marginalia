import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserEditForm from './UserEditForm'
import UserTextShow from "./UserTextShow"
import { fetchUserById } from './showUserSlice'
import { Grid, Paper, Typography, Avatar, Button } from '@mui/material'


export default function UserShow() {
	const [editClicked, setEditClicked] = useState(false)
	
	const params = useParams()
	const dispatch = useDispatch()

	const { entities:showUser, status:showUserStatus } = useSelector((state) => state.showUser)
	const user = useSelector((state) => state.user.entities[0])

	// let litTextIds = []
	useEffect(() => {
		dispatch(fetchUserById(params.id))
		// .then(() => {
		// 	// let arr = showUser.comments.map((c) => c.lit_text_id)
		// 	// litTextIds = [... new Set(arr)]
		// 	console.log("Usershow showUser", showUser)
		// })
	}, [])


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
	let litTextIds = []
	let renderPreviews = []
	if (showUser.comments) {
		let undeleted = showUser.comments.filter((c) => c.deleted === false)
		console.log("UserShow:undeleted", undeleted)
		let arr = undeleted.map((c) => c.lit_text_id)
		litTextIds = [...new Set(arr)]
		renderPreviews = litTextIds.map((id) => <UserTextShow key={`lt${id}`} id={id} comments={undeleted} />)
	}
	// const arr = showUser.comments.map((c) => c.lit_text_id)
	// const litTextIds = [... new Set(arr)]
		// console.log("showUser.comments", showUser.comments)
		// console.log("arr", arr)
		// console.log("litTextIds", litTextIds)
	
	 

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
					<Typography variant="h5" sx={{ textAlign:"center", mt: 3, fontVariant: "small-caps", }} >bio</Typography> 					
					<Typography variant="body1" sx={{ textAlign:"center", m: 4, mt: 0, }} >{showUser.bio}</Typography> 
					<Typography variant="body2" sx={{ textAlign:"center", m: 1, mb: 5, color: "#373737"}}><em>Joined {renderDate}</em></Typography>
					{showUser.id === user.id ?
						<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
							<Button variant="contained" onClick={editButtonClick} sx={{ mb: 5 }}>Edit</Button>
							{editClicked ?
								<UserEditForm 
								user={user}
								updateUser={updateUser} /> 
							: null}
						</div>
					: null}
					<Typography variant="h5" sx={{ textAlign:"center", mb: 1, }} >Comments</Typography> 					
					{renderPreviews} 
				</Paper>
			</Grid>
		</Grid>
		)
	} else if (showUserStatus === "loading") {
		return (
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	} else {
		return (
			<div className="centered-in-window" >
				<h1>We're sorry. There's been an error.</h1>
			</div>
		)
	}
}