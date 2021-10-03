import { useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useState, useRef } from "react"
import TimeAgoContainer from "../shared/TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"
import CommentType from "./CommentType"
import CommentNewForm from "./CommentNewForm"
import { destroyComment, patchComment } from "./commentsSlice"

export default function ComRepShow({ comment, litTextId }) {
	const [editClicked, setEditClicked] = useState(false)
	const [replyClicked, setReplyClicked] = useState(false)
	const [errors, setErrors] = useState([])

  const userState = useSelector((state) => state.user)
  const userId = userState.entities.length > 0 ? userState.entities[0].id : null
	
	const showComment = {
		fullname: comment.user.fullname,
		username: comment.user.username,
		content: comment.content,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: comment.deleted,
		id: comment.id,
		com_types: comment.com_types
	}

	const ghost = <span role="img" aria-label="ghost"> 💀 👻 </span>

	const deletedComment = {
		fullname: ghost,
		username: "",
		content: <em>this comment was deleted by user </em>,
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

	// function handleDelete(e) {
	// 	e.preventDefault()
	// 	fetch(`/comments/${comment.id}`, {
	// 		method: "DELETE"
	// 	})
	// 	.then((r) => {
	// 		if (r.status === 200) {
	// 			setRenderComment(deletedComment)
	// 		} else if (r.status === 204) {
	// 			onDeleteComment(comment.id)
	// 		} else {r.json()}
	// 		})
	// 	.catch((errors) => setErrors(errors))
	// }

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
		<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative" }} >
			<div style={{ backgroundColor: "lightgray", padding: 3}} >
				<div><b>{renderComment.fullname}</b></div>
				{renderComment.deleted ? null : 
					<div>@{renderComment.username}</div>}
				{renderComment.deleted ? null : 
					<CommentType comTypes={renderComment.com_types} />}
			</div>
			<p>
				{/* <span style={{ fontSize: 10 }} >(
					<span>id: {renderComment.id}</span>
					{renderComment.parent_comment_id ? <span>, replying to: {renderComment.parent_comment_id}</span>: null}) 
				</span> */}
				{renderComment.content}
			</p>	
			<TimeAgoContainer 
				created_at={renderComment.created_at} 
				updated_at={renderComment.updated_at} 
				isDeleted={renderComment.deleted} 
			/>
			<div>
				{errors ? errors.map((e) => <div>{e}</div>) : null}
				<div style={{ position: "relative" }}>
					{!renderComment.parent_comment_id && !renderComment.deleted ?
						<button onClick={replyButtonClick} >Reply</button> 
					: null}
					{parseInt(comment.user.id) === parseInt(userId) && !renderComment.deleted ? 
						<Fragment>
							<button onClick={editButtonClick} style={{ position: "absolute", right: 65, bottom: 5 }} >Edit</button>
							<button onClick={handleDelete} style={{ position: "absolute", right: 5, bottom: 5 } } >Delete</button>
							<button style={{ visibility: "hidden" }} ></button>
							</Fragment>
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

			</div>
		</div>	
	)
}

				{/* <div style={{ position: "relative" }}>
					{!renderComment.parent_comment_id && !renderComment.deleted ?
						<button onClick={replyButtonClick} >Reply</button> 
					: null} */}
					{/* {parseInt(commentUser.id) === parseInt(user.id) && !renderComment.deleted ? 
						<Fragment>
							<button onClick={editButtonClick} style={{ position: "absolute", right: 65, bottom: 5 }} >Edit</button>
							<button style={{ position: "absolute", right: 5, bottom: 5 } } >Delete</button>
							<button style={{ visibility: "hidden" }} ></button>
							</Fragment>
					: null} */}
				{/* </div> */}