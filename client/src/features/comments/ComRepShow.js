import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import TimeAgoContainer from "../shared/TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"
import CommentType from "./CommentType"
import CommentNewForm from "./CommentNewForm"
import { destroyComment, patchComment } from "./commentsSlice"
import { Avatar, Grid, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCommentIcon from '@mui/icons-material/AddComment'


export default function ComRepShow({ comment, litTextId }) {
	const [editClicked, setEditClicked] = useState(false)
	const [replyClicked, setReplyClicked] = useState(false)
	const [errors, setErrors] = useState([])

  const userState = useSelector((state) => state.user)
  const userId = userState.entities.length > 0 ? userState.entities[0].id : null

	const showComment = {
		fullname: comment.user.fullname,
		username: comment.user.username,
		image: comment.user.image,
		content: comment.content,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: comment.deleted,
		id: comment.id,
		com_types: comment.com_types
	}

	const deletedComment = {
		fullname: "",
		username: "",
		image: "https://ih1.redbubble.net/image.110003985.7172/flat,750x1000,075,f.u2.jpg",
		content: <em style={{ color: "#616161" }}>[this comment was deleted by user]</em>,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: true,
		id: comment.id,
		com_types: []
	}

	const renderComment = comment.deleted ? deletedComment : showComment

	const dispatch = useDispatch() 

	function handleDelete(e) {
		e.preventDefault()
		if (comment.replies.length > 0 || comment.parent_comment_id) {
			const changeCom = {
				...comment,
				deleted: true
			}
			dispatch(patchComment(changeCom))
		} else {
			let id = comment.id
			dispatch(destroyComment(id))
		}
	}

	function wrapSetErrors(data){
		setErrors(data)
	}

	function editButtonClick() {
		setEditClicked(!editClicked)
		setReplyClicked(false)
	}

	function replyButtonClick() {
		setReplyClicked(!replyClicked)
		setEditClicked(false)
	}


	return (
		<div style={{ position: "relative"}}>
		<Grid item sx={12}>
		<Grid container spacing={2} wrap="nowrap">
				{renderComment.deleted ? null : 
					<CommentType comTypes={renderComment.com_types} />
				}
			<Grid item sx={3}>
				<Avatar alt={renderComment.fullname} src={renderComment.image} />
			</Grid>
			<Grid justifyContent="left" item xs={9}>
				<Typography variant="h6">{renderComment.fullname}</Typography>
				{renderComment.deleted ? null : 
					<Typography variant="subtitle2"><em>@{renderComment.username}</em></Typography>
				}
				<Typography variant="body1" sx={{ mt:2, mb:2 }}>
					{/* TO CHECK THAT REPLIES ARE RENDERING UNDER THE RIGHT COMMENT */}
					{/* <span style={{ fontSize: 10 }} >(
						<span>id: {renderComment.id}</span>
						{renderComment.parent_comment_id ? <span>, replying to: {renderComment.parent_comment_id}</span>: null}) 
					</span> */}
					{renderComment.content}
				</Typography>	
				<TimeAgoContainer 
					created_at={renderComment.created_at} 
					updated_at={renderComment.updated_at} 
					isDeleted={renderComment.deleted} 
				/>
			</Grid>
			</Grid>
			<Grid item xs={12}>
				{errors ? errors.map((e) => <div>{e}</div>) : null}
				<div style={{ position: "relative" }}>
					{!renderComment.parent_comment_id && !renderComment.deleted ?
            <Tooltip title="Reply" arrow>
							<AddCommentIcon size="large" sx={{ color: "#757575", ml:7, mt:2, mb:1 }} onClick={replyButtonClick}/> 
						</Tooltip>
					: null}
					{parseInt(comment.user.id) === parseInt(userId) && !renderComment.deleted ? 
						<div style={{ justifyContent: "right" }} >
							<Tooltip title="Delete" arrow >
								<DeleteIcon size="large" sx={{ color: "#757575", position: "absolute", right: 45, mt:2, mb:1 }} onClick={handleDelete} /> 
							</Tooltip>
							<Tooltip title="Edit" arrow >
								<EditIcon size="large" sx={{ color: "#757575", position: "absolute", right: 5, mt:2, mb:1  }} onClick={editButtonClick} /> 
							</Tooltip>
							<AddCommentIcon sx={{ visibility: "hidden", mt:2, mb:2}} />
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
					/>
				: null} 

			</Grid>
		</Grid>	
		</div>
	)
}
