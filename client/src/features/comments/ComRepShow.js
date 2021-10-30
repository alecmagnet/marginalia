import { useState, useMemo } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import TimeAgoContainer from "../shared/TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"
import CommentType from "./CommentType"
import CommentNewForm from "./CommentNewForm"
import { destroyComment, patchComment } from "./commentsSlice"
import { Avatar, Grid, Typography, IconButton, Button, Popper, Fade, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCommentIcon from '@mui/icons-material/AddComment'
import CancelIcon from '@mui/icons-material/Cancel'


export default function ComRepShow({ comment, litTextId }) {
	const [editClicked, setEditClicked] = useState(false)
	const [replyClicked, setReplyClicked] = useState(false)
	const [errors, setErrors] = useState([])
	const [deleteClicked, setDeleteClicked] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)

  const userState = useSelector((state) => state.user)
  const userId = userState.entities.length > 0 ? userState.entities[0].id : null

	const dispatch = useDispatch() 
	const history = useHistory()

	const isParentQuestion = () => {
		if (comment.com_types.find(type => type.id === 2)) {
				return true
		} else {
			return false
		}
	}

	const showComment = useMemo(() => {return ({
		fullname: comment.user.name,
		username: comment.user.username,
		image: comment.user.image,
		content: comment.content,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: comment.deleted,
		id: comment.id,
		com_types: comment.com_types
	})}, [comment])

	const deletedComment = useMemo(() => {return ({
		fullname: "",
		username: "",
		content: <em style={{ color: "#616161" }}>[this comment was deleted]</em>,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: true,
		id: comment.id,
		com_types: []
	})}, [comment])

	const renderComment = useMemo(() => {
		return comment.deleted ? deletedComment : showComment}, [comment, deletedComment, showComment])


	const comTypeIds = comment.com_types.map(type => type.id)

	const handleDeleteClick = (e) => {
    setAnchorEl(e.currentTarget)
		setDeleteClicked(prev => !prev)
	}
	const canBeOpen = deleteClicked && Boolean(anchorEl)
  const popperId = canBeOpen ? 'transition-popper' : undefined	

	function handleDelete(e) {
		setEditClicked(() => false)
		e.preventDefault()
		if (comment.replies.length > 0 || comment.parent_comment_id) {
			const changeCom = {
				...comment,
				com_type_ids: [...comTypeIds],
				deleted: true
			}
			dispatch(patchComment(changeCom))
		} else {
			let id = comment.id
			dispatch(destroyComment(id))
		}
	}


	function editButtonClick() {
		setEditClicked(!editClicked)
		setReplyClicked(false)
	}

	function replyButtonClick() {
		setReplyClicked(!replyClicked)
		setEditClicked(false)
	}

	const userClicked = () => {
		history.push(`/users/${comment.user.id}`)
	}

	function wrapSetErrors(data){
		setErrors(data)
	}


	const ghost = <span role="img" aria-label="ghost"> 👻 </span>

	const DeleteTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: "#732626",
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: "#732626",
		},
	}))


	return (
		<div id={comment.id} style={{ position: "relative"}}>
			<Grid item xs={12} >
				<Grid container spacing={2} >

					{renderComment.deleted ? null : 
						<CommentType comTypes={renderComment.com_types} />
					}

					<Grid item xs="auto">
						{renderComment.deleted ? 
							<Avatar sx={{ bgcolor: "#eee" }}>
								{ghost}
							</Avatar>
						: 
							<Avatar 
								alt={renderComment.fullname} 
								src={renderComment.image} 
								sx={{ cursor: "pointer", width: 60, height: 60, }} 
								onClick={() => userClicked()} 
							/>
						}
					</Grid>

					<Grid justifyContent="left" item xs={11} sm>
						<Typography 
							onClick={userClicked} 
							sx={{ cursor: "pointer", fontSize: 25, fontWeight: 401, mb: -1, pb: 0 }} 
						>
							{renderComment.fullname}
						</Typography>

						{renderComment.deleted ? 
							<Typography variant="body1" sx={{ mt:"12px", mb:1 }}>
								{renderComment.content}
							</Typography>	 
						: 
						<>
							<Typography variant="subtitle2" onClick={userClicked} sx={{ cursor: "pointer", mt: 0, pt: 0, color: "#757575", fontWeight: 400 }} ><em>@{renderComment.username}</em></Typography>
							<Typography variant="body1" sx={{ mt:2, mb:1 }}>
								{renderComment.content}
							</Typography>	
						</>
						}

						<TimeAgoContainer 
							created_at={renderComment.created_at} 
							updated_at={renderComment.updated_at} 
							isDeleted={renderComment.deleted} 
							fromLitTextShow={false}
						/>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					{errors ? errors.map((e) => <div>{e}</div>) : null}
					<div style={{ position: "relative" }}>
						{!renderComment.parent_comment_id && !renderComment.deleted ?
							<Tooltip title="Reply" arrow>
								<IconButton sx={{ color: "#757575", ml:9, mt:2, }} onClick={replyButtonClick}>
									{replyClicked ? <CancelIcon/> : <AddCommentIcon/>} 
								</IconButton>
							</Tooltip>
						: null}
						{parseInt(comment.user.id) === parseInt(userId) && !renderComment.deleted ? 
							<div style={{ justifyContent: "right" }} >
								<IconButton id="deleteButton1" onClick={handleDeleteClick} sx={{ color: "#732626", position: "absolute", right: 45, bottom: 5, mt:2, mb:0 }}>
									<DeleteTooltip title="Delete" arrow>
										<DeleteIcon size="large" sx={{ color: "#732626" }} /> 
									</DeleteTooltip>
								</IconButton>
								<Popper 
									id={popperId} 
									open={deleteClicked} 
									anchorEl={anchorEl} 
									placement="top" 
									modifiers={[
										{
											name: 'preventOverflow',
											enabled: true,
											options: {
												altAxis: true,
												altBoundary: true,
												tether: true,
												rootBoundary: 'document',
												padding: 5,
											},
										}
									]}
									transition>
									{({ TransitionProps }) => (
										<Fade {...TransitionProps} timeout={350}>
											<Box sx={{ border: 1, p: 3, m: 2, bgcolor: 'background.paper', display:"flex", justifyContent: "center", borderColor: "#660000" }}>
													<Button variant="contained" onClick={handleDeleteClick} sx={{ mr: 3, bgcolor: "6d4c41" }}>
														Cancel
													</Button>
													<Button variant="contained" onClick={handleDelete} sx={{ bgcolor: "#660000" }}>
														Delete
													</Button>
												{/* </Box> */}
											</Box>
										</Fade>
									)}
								</Popper>	
								<Tooltip title="Edit" arrow >
									<IconButton sx={{ color: "#757575", position: "absolute", right: 5, bottom: 5, mt:3, }} onClick={editButtonClick} >
									{editClicked ? <EditOffIcon/> : <EditIcon/>}
									</IconButton> 
								</Tooltip>
								{!renderComment.parent_comment_id ? null: <AddCommentIcon sx={{ visibility: "hidden", mt:2, mb:2}} />}
								</div>
						: null}					
					</div>
					
					{editClicked ? 
						<CommentEditForm 
							comment={comment}
							editButtonClick={editButtonClick}
							wrapSetErrors={wrapSetErrors}
						/> 
					: null}

					{replyClicked ? 
						<CommentNewForm 
							litTextId={litTextId} 
							parentCommentId={comment.id} 
							replyButtonClick={replyButtonClick} 						
							isParentQuestion={isParentQuestion()}
						/>
					: null} 

				</Grid>
			</Grid>	
		</div>
	)
}