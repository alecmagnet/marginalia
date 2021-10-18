import { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserEditForm from './UserEditForm'
import UserTextShow from "./UserTextShow"
import { fetchUserById } from './showUserSlice'
import { Grid, Paper, Typography, Avatar, Button, Card, Divider } from '@mui/material'


export default function UserShow() {
	const [editClicked, setEditClicked] = useState(false)
	
	const history = useHistory()
	const params = useParams()
	const dispatch = useDispatch()

	const { entities:showUser, status:showUserStatus } = useSelector((state) => state.showUser)
	const user = useSelector((state) => state.user.entities[0])

	useEffect(() => {
		dispatch(fetchUserById(params.id))
	}, [])
	console.log("Usershow showUser", showUser)

	function editButtonClick() {
		setEditClicked(!editClicked)
	}

	const goCommentClick = () => {
		history.push("/texts")
	}

	function handleUpdatedUser() {
		// setShowUser(data) DISPATCH PATCH REQUEST HERE OR IN EDIT FORM?
		setEditClicked(!editClicked)
	}

	const msec = Date.parse(showUser.created_at)
  const parseDate = new Date(msec).toDateString()
  const trimDate = parseDate.slice(4)
  const splitDate = trimDate.split(" ")
  const renderDate = `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`

	// let litTextIds = []
	// let renderPreviews = []
	const undeleted = () => {
		// if (showUserStatus === "loading" || showUser === []) {
		// 	return []
		// } else if (showUser.comments) {
		if (showUser.comments) {
			return showUser.comments.filter((c) => c.deleted === false)
		} else {
			return []
		}
	}
	const litTextIds = () => {
		if (undeleted().length === 0) {
			return []
		} else {
			let arr = undeleted().map((c) => c.lit_text_id)
			return [...new Set(arr)]
		}
	}
	const renderPreviews = () => {
		if (litTextIds().length === 0) {
			return []
		} else {
			return litTextIds().map((id) => <UserTextShow key={`lt${id}`} id={id} comments={undeleted()} />)
		}
	}
	// if (showUser.comments) {
	// 	let undeleted = showUser.comments.filter((c) => c.deleted === false)
	// 	console.log("UserShow:undeleted", undeleted)
	// 	let arr = undeleted.map((c) => c.lit_text_id)
	// 	litTextIds = [...new Set(arr)]
	// 	renderPreviews = litTextIds.map((id) => <UserTextShow key={`lt${id}`} id={id} comments={undeleted} />)
	// }
	 

	if (showUserStatus === "loading" || showUser === []) {
		return (
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	} else if (showUserStatus === "idle" && typeof(showUser) === "object") {
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
					<Typography variant="h6" sx={{ textAlign:"center", mb: 2, color: "#616161" }}><em>@{showUser.username}</em></Typography>
					<Card variant="outlined" sx={{ p:1, pt: 0, mt:0, mb:2, mx:"20%", backgroundColor: "#fefcf9", }}>
						<Typography sx={{ fontSize: 17, textAlign:"center", }} color="#757575" gutterBottom>
							Bio
						</Typography>				
						<Typography variant="body2" sx={{ textAlign:"center", }} >{showUser.bio}</Typography> 
					</Card>
					<Typography variant="body2" sx={{ textAlign:"center", m: 1, mb: 2, color: "#373737"}}><em>Joined {renderDate}</em></Typography>
					{showUser.id === user.id ?
						<div>
							<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
								<Button variant="contained" onClick={editButtonClick} >Edit</Button>
							</div>
							{editClicked ?
								<UserEditForm 
								user={user}
								handleUpdatedUser={handleUpdatedUser} /> 
							: null}
						</div>
					: null}
					<Divider sx={{ m: 5, }}>
						<Typography variant="h5" sx={{ textAlign:"center", }} >Comments</Typography>
					</Divider> 		
					{/* {user.comments.length > 0 ? <div>{renderPreviews}</div> : */}
					{undeleted().length > 0 ? 
						<div>{renderPreviews()}</div> 
					: showUser.id === user.id ?
						<Typography variant="body2" onClick={goCommentClick} sx={{ textAlign:"center", m: 1, mt: 3, mb: 2, color: "#546e7a", textDecoration: "underline", cursor: "pointer", }}>
							Go comment on some stories and poems!
						</Typography>
					:
						<Typography variant="body2" sx={{ textAlign:"center", m: 1, mt: 3, mb: 2, color:"#757575" }} >
							This user hasn't written any comments yet
						</Typography>
					}			 
				</Paper>
			</Grid>
		</Grid>
		)
	} else {
		return (
			<div className="centered-in-window" >
				<h1>We're sorry. There's been an error.</h1>
			</div>
		)
	}
}