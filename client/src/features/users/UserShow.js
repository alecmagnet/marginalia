import { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserEditForm from './UserEditForm'
import UserTextShow from "./UserTextShow"
import LitTextListShow from '../litTexts/LitTextListShow'
import { fetchUserById } from './showUserSlice'
import { logoutUser } from '../users/userSlice'
import { Grid, Typography, Avatar, Button, Divider, Popper, Fade, Box, ToggleButton, ToggleButtonGroup } from '@mui/material'


export default function UserShow() {
	const [deleteClicked, setDeleteClicked] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)
	const [errors, setErrors] = useState([])
	const [displayToggledOption, setDisplayToggledOption] = useState("Comments")

	const history = useHistory()
	const params = useParams()
	const dispatch = useDispatch()

	const { entities:showUser, status:showUserStatus } = useSelector((state) => state.showUser)
	const user = useSelector((state) => state.user.entities[0])

	useEffect(() => {
		const fetchUser = () => dispatch(fetchUserById(params.id))
		fetchUser()
	}, [params.id, dispatch])

	const handleToggleClick = (event, newOption) => {
		setDisplayToggledOption(() => newOption)
	}

	const toggleOptionsArr = ["Comments", "Texts Uploaded"]

	const makeToggleButton = (option) =>
		<ToggleButton 
			key={toggleOptionsArr.indexOf(option)} 
			value={option}
			aria-label={option}
		>
			{option}
		</ToggleButton>

	
	const litTextsState = useSelector((state) => state.litTexts)
	const litTextsArr = [...litTextsState.entities]

	const showUserLitTexts = () => litTextsArr.filter(text => text.uploader_id === showUser.id)


	const handleDeleteClick = (e) => {
    setAnchorEl(e.currentTarget);
		setDeleteClicked(prev => !prev)
	}
	const canBeOpen = deleteClicked && Boolean(anchorEl);
  const popperId = canBeOpen ? 'transition-popper' : undefined;


	const goCommentClick = () => {
		history.push("/texts")
	}


	const deleteUser = () => {
		fetch(`/api/users/${user.id}`, {
			method: "DELETE",
		})
		.then(r => {
			// console.log(r)
			if (r.ok) {
				setErrors([])
				dispatch(logoutUser())
				history.push("/signup")
			} else {
				setErrors(["We're sorry. We encountered an error."])
			}
		})
	}

	const msec = Date.parse(showUser.created_at)
  const parseDate = new Date(msec).toDateString()
  const trimDate = parseDate.slice(4)
  const splitDate = trimDate.split(" ")
  const renderDate = `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`

	const undeleted = () => {
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
	const renderComPreviews = () => {
		if (litTextIds().length === 0) {
			return []
		} else {
			return litTextIds().map((id) => <UserTextShow key={`lt${id}`} id={id} comments={undeleted()} />)
		}
	}

	const renderUploadPreviews = () =>
		<Grid container item xs={12} sm={11}>
			{showUserLitTexts().map(text => <LitTextListShow key={text.id} litText={text}/>)}
		</Grid>


	const goDoWhatLink = (what) => 
		<Typography 
			variant="body2" 
			onClick={goCommentClick} 
			sx={{ 
				textAlign:"center", 
				m: 1, mt: 3, mb: 2, 
				color: "#546e7a", 
				textDecoration: "underline", 
				cursor: "pointer", 
			}}
		>
			{`Go ${what} some stories and poems!`}
		</Typography>

	const hasNotWhatYet = (what) =>
		<Typography 
			variant="body2" 
			sx={{ 
				textAlign:"center", 
				mx: 1, mt: 3, mb: 2, 
				color:"#757575" 
			}}
		>
			{`This user hasn't ${what} yet`}
		</Typography>


	const showWhat = (lengthArr, what, doneWhat) => 
		lengthArr.length > 0 ? 
			<Grid item container justifyContent="center">
				{what}
			</Grid> 
		: showUser.id === user.id ?
			<>{goDoWhatLink(doneWhat[0])}</>
		:
			<>{hasNotWhatYet(doneWhat[1])}</>

	 

	if (showUserStatus === "loading" || showUser === []) {
		return (
			<div className="centered-in-window" >
				<div className="dot-flashing"></div>
			</div>
		)
	} else if (showUserStatus === "idle" && typeof(showUser) === "object") {
		return (
			<Grid 
				container 
				justifyContent="Center"	
				sx={{ pt: 5, px: 3 }}
				spacing={3}
			>
				<Grid	item xs="auto">
					<Avatar 
						variant="rounded"
						alt={showUser.name}
						src={showUser.image}
						align="center"
						sx={{ width: 300, height: 300, mr: 2, ml: 3, mt: 1 }}
					/>
				</Grid>
				<Grid item xs sx={{ mr: 2, mt: 2 }}>
					<Typography variant="h4" sx={{ }}>
						<b>{showUser.name}</b>
					</Typography>
					<Typography variant="h6" sx={{ mb: 2, color: "#616161" }}>
						<em>@{showUser.username}</em>
					</Typography>

					<Typography 
						sx={{ fontSize: 19, mb: "-1px", mt: 3 }} 
						color="#757575" 
					>
						Bio
					</Typography>				
					<Typography variant="body2" sx={{ }} >
						{showUser.bio}
					</Typography> 
					<Typography variant="body2" sx={{ 
						mb: 4, mt: 3, color: "#373737"
					}}>
						<em>Joined {renderDate}
							<span style={{ 
								marginLeft: "13px", 
								marginRight: "13px"
							}}>❧</span>
							{showUser.usertype}
						</em>
					</Typography>
				</Grid>

				<Grid container item xs={12} justifyContent="center" display="nowrap">
					<Divider sx={{ mx: 3, mb: 3, width: "90%" }} textAlign="center"/>
						<ToggleButtonGroup 
							value={displayToggledOption}
							onChange={handleToggleClick}
							aria-label="Display"
							exclusive
							sx={{ mb: 4 }} 
						>
							{toggleOptionsArr.map(option => 
								makeToggleButton(option)
							)}
							{showUser.id === user.id ?
								makeToggleButton("Edit Profile")
							: null}
						</ToggleButtonGroup>
						<br/>
					{/* </Divider>	 */}
					{displayToggledOption === "Edit Profile" ?
						<Grid item xs={11} sm={10} justifyContent="center"> 
							<UserEditForm 
								user={user}
							/>
						</Grid>
					: displayToggledOption === "Texts Uploaded" ?
						showWhat(showUserLitTexts(), renderUploadPreviews(), ["upload", "uploaded any texts"])
					: displayToggledOption === "Comments" ?
						showWhat(undeleted(), renderComPreviews(), ["comment on", "written any comments"])
					: setDisplayToggledOption("Comments")
					}
					{showUser.id === user.id && displayToggledOption === "Edit Profile" ?
						<>

							{errors ? errors.map(e => <div key={e} style={{ color: "#660033", textAlign: "center" }} >{e}</div>) : null}

							<Box sx={{ display:"flex", width: "100%", justifyContent: "center", m: 3 }}>
								<Button variant="contained" onClick={handleDeleteClick} >
									Delete Profile
								</Button>
							</Box>
							<Popper 
								id={popperId} 
								open={deleteClicked} 
								anchorEl={anchorEl} 
								modifiers={[
									{
										name: 'preventOverflow',
										enabled: true,
										options: {
											altAxis: true,
											altBoundary: true,
											tether: true,
											rootBoundary: 'document',
											padding: 8,
										},
									}
								]}
								transition>
								{({ TransitionProps }) => (
									<Fade {...TransitionProps} timeout={350}>
										<Box sx={{ border: 1, p: 3, m: 2, bgcolor: 'background.paper', justifyContent: "center", borderColor: "#660000" }}>
											<Typography variant="h6" sx={{ textAlign: "center", mb: 1, color: "#660000" }}>
												Are you sure you want to delete your profile?
											</Typography>
											<Typography variant="subtitle1" sx={{ textAlign: "center", fontSize: 22, mb: 3 }}>
												This action cannot be undone!
											</Typography>
											<Box component="div" sx={{ display:"flex", width: "100%", justifyContent: "center", }}>
												<Button variant="contained" onClick={handleDeleteClick} sx={{ mr: 4, mb: 2, bgcolor: "6d4c41" }}>
													Cancel
												</Button>
												<Button variant="contained" onClick={deleteUser} sx={{ mb: 2, bgcolor: "#660000" }}>
													Delete
												</Button>
											</Box>
										</Box>
									</Fade>
								)}
							</Popper>
						</>
					: null}
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