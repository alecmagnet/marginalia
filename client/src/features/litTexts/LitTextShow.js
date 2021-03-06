import parse from 'html-react-parser'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, Typography, Tooltip, IconButton } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import ForumIcon from '@mui/icons-material/Forum';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import CommentsList from '../comments/CommentsList'
import LitTextNewForm from './litTextNewForm/LitTextNewForm'
import TimeAgoContainer from '../shared/TimeAgoContainer'
import { fetchLitTextById } from './showTextSlice'

export default function LitTextShow() {
	const [editClicked, setEditClicked] = useState(false)
	const [forceRender, setForceRender] = useState(false)
	const params = useParams()
  const dispatch = useDispatch()
	const history = useHistory()

	const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })

	const onRender = useCallback(() => {
		dispatch(fetchLitTextById(params.id))
	}, [dispatch, params.id])

	const user = useSelector((state) => state.user.entities[0])
	const litTextState = useSelector((state) => state.showText)
	const litText = litTextState.entities.length > 0 ? litTextState.entities[0] : null
	// console.log("litText", litText, "user", user)

	useEffect(() => {
		onRender()
	}, [forceRender, onRender])

	const handleEditClick = () => {	
		setEditClicked(prev => !prev)
	}

	const reRender = () => {
		setForceRender(prev => !prev)
	}

	const handleUploaderClick = () => {
		history.push(`/users/${litText.uploader_id}`)
	}
	

	let parsedContent = ""
	let isProse = "Poetry"
	if (litTextState.entities.length > 0) {
		parsedContent = parse(`${litText.content}`)
		if (litText.prose) {
			isProse = "Prose"
		}
	}

	const displayDate = () => {
		const value = litText.pubdate
		return value < 0 ? `${Math.abs(value)} BCE` 
		: value <1000 ? `${value} CE`
		: value
	}

	const renderName = () => litText.fam_name_first ? `${litText.last_name} ${litText.first_name}` : `${litText.first_name} ${litText.last_name}`


	if (litTextState.status === "idle" && litTextState.entities.length > 0) {
		return (
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={12} md={10}
			>
				<div style={{ 
					display:"flex", 
					justifyContent:"center", 
					marginTop: 12, 
					paddingBottom: 2 
				}}>
					<Tooltip title="Comments" arrow>
						<ForumIcon size="small" sx={{mt: 3, mr: '18px', color: "#757575" }} onClick={() => scrollTo("comments")}/>
					</Tooltip>
					<Tooltip title="New Comment" arrow>
						<AddCommentIcon size="small" sx={{mt: 3, mr: '18px', color: "#757575" }} onClick={() => scrollTo("new-comment")}/>
					</Tooltip>
				</div>
				<Paper 
					elevation={9} 
					sx={{ p:3, mb: 3, mt: 1, justifyContent:"center", minWidth: "350px" }}
				>
					<Typography 
						variant="subtitle1" 
						sx={{ textAlign:"center", color:"#616161", pb: 0, cursor: "default" }}
					>
						<em>{isProse}</em>
					</Typography>
					<Grid container wrap="nowrap">
						<Grid item xs={12}>
							<Typography variant="h4" sx={{ textAlign:"center", mt: 1 }}>
								<b>{litText.title}</b>
							</Typography>
							<Typography variant="h6" sx={{ textAlign:"center" }}>
								{renderName()}
							</Typography>
							<Typography variant="subtitle1" sx={{ textAlign:"center" }}>
								{displayDate()}
							</Typography>
							{litText.translator.length > 0 ? 
								<Typography 
									variant="subtitle2" 
									sx={{ textAlign:"center", color: "#8e8e8e", mt: 1 }}
								>
									<em>{`Translated by ${litText.translator}`}</em>
								</Typography>
							: null }

							<Grid container wrap="nowrap">
								<Grid item xs={12} justifyContent="center" sx={{ display: "flex", }}>
									<div style={{ position: "flex", }} >
										<Typography variant="body1" component="div" sx={{ pb:3, pr:3, pl:3, pt:2, }}>
										{litText.prose ?	
											<div>
												{parsedContent}
											</div>
										:
											<div className="poetry">
												<br/>
												{parsedContent}
											</div>
										}
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<div style={{ 
						display:"flex", 
						justifyContent:"center", 
						marginTop: 12, 
						paddingBottom: 2 
					}}>
						<TimeAgoContainer 
							created_at={litText.created_at} 
							uploader={litText.uploader.name}
							updated_at={litText.updated_at} 
							editor={litText.edit_user}
							isDeleted={false} 
							fromLitTextShow={true}
							handleUploaderClick={handleUploaderClick}
						/>
					</div>
					
					{ editClicked ?
						<div>
							<div style={{ 
								display:"flex", 
								justifyContent:"center", 
								marginTop: 12, 
								paddingBottom: 2 
							}}>
								<Tooltip title="Close editor" arrow>
									<EditOffOutlinedIcon
										onClick={() => handleEditClick()}
										size="large"
									/> 
								</Tooltip>
							</div>
							<LitTextNewForm 
								handleNewClick={handleEditClick} 
								handleLitTextsOrder={null} 
								handlePoetryProseValue={null}
								isEdit={true}
								litText={litText}
								reRender={reRender}
							/> 	
						</div>
					: 
						<div style={{ 
							display:"flex", 
							justifyContent:"center", 
							marginTop: 12, 
							paddingBottom: 2 
						}}>
							{user.usertype === "Librarian" || user.id === litText.uploader_id ?
								<Tooltip title="Edit" arrow>
									<EditOutlinedIcon
										onClick={() => handleEditClick()}
										size="large"
									/> 
								</Tooltip>
							:
								<Tooltip title={<div style={{ textAlign: "center" }}>We're sorry. You must be a Marginalia libarian to edit texts.<br/>Please contact the site admin if you want to become a librarian.</div>} arrow>
									<div>
									<IconButton disabled>
									<EditOutlinedIcon
										size="large"
									/> 
									</IconButton>
									</div>
								</Tooltip>
							}
						</div>
 					}		
				</Paper>
			</Grid>
			<Grid 
				id="comments"
				container item 
				xs={10} sm={11} md={10} 
				justifyContent="center" 
			>
				<CommentsList 
					litTextId={litText.id} 
				/>
			</Grid>
		</Grid>
		)
	} else {
		return (
			<div className="centered-in-window" >
				<div className="dot-flashing"></div>
			</div>
		)
	}
}