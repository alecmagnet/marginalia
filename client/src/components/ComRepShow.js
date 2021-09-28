import { useState, Fragment } from "react"
// import { useState, useRef } from "react"
import TimeAgoContainer from "./TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"
import CommentType from "./CommentType"

export default function ComRepShow({ comment, user, commentUser, onDeleteComment, changeDummyState, forceRender, onEditComment }) {
	const [editClicked, setEditClicked] = useState(false)
	const [replyClicked, setReplyClicked] = useState(false)
	const [errors, setErrors] = useState([])

	const [stateComment, setStateComment] = useState(comment)
	// const ref = useRef(stateComment)
	
	const showComment = {
		fullname: commentUser.fullname,
		username: commentUser.username,
		content: stateComment.content,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		parent_comment_id: stateComment.parent_comment_id,
		deleted: stateComment.deleted,
		id: stateComment.id,
		com_types: stateComment.com_types
	}

	const skull = <span role="img" aria-label="skull and ghost"> 💀 👻 </span>

	const deletedComment = {
		fullname: skull,
		username: "",
		content: <em>this comment was deleted by user </em>,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		parent_comment_id: stateComment.parent_comment_id,
		deleted: true,
		id: stateComment.id,
		com_types: []
	}

	const commentInitialState = comment.deleted ? deletedComment : showComment
	const [renderComment, setRenderComment] = useState(commentInitialState)

	function handleDelete(e) {
		e.preventDefault()
		fetch(`/comments/${comment.id}`, {
			method: "DELETE"
		})
		.then((r) => {
			if (r.status === 200) {
				setRenderComment(deletedComment)
			} else if (r.status === 204) {
				onDeleteComment(comment.id)
			} else {r.json()}
			})
		.catch((errors) => setErrors(errors))
	}

	function handleEditComment(data) {
		console.log("onEditComment:data", data)
		setStateComment(data)
		// updateCommentState(data)
		console.log("onEditComment:stateComment", stateComment)
		onEditComment(data)
	}

	function wrapSetErrors(data){
		setErrors(data)
	}

	function editButtonClick() {
		setEditClicked(!editClicked)
	}

	function replyButtonClick() {
		setReplyClicked(!replyClicked)
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
				<span style={{ fontSize: 10 }} >(
					<span>id: {renderComment.id}</span>
					{renderComment.parent_comment_id ? <span>, replying to: {renderComment.parent_comment_id}</span>: null}) 
				</span>
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
					{parseInt(commentUser.id) === parseInt(user.id) && !renderComment.deleted ? 
						<Fragment>
							<button onClick={editButtonClick} style={{ position: "absolute", right: 65, bottom: 5 }} >Edit</button>
							<button onClick={handleDelete} style={{ position: "absolute", right: 5, bottom: 5 } } >Delete</button>
						</Fragment>
					: <button style={{ visibility: "hidden" }} ></button>}
				</div>
				{editClicked ? 
					<CommentEditForm 
						forceRender={forceRender}
						comment={renderComment}
						handleEditComment={handleEditComment}
						onEditComment={onEditComment}
						editButtonClick={editButtonClick}
						wrapSetErrors={wrapSetErrors}
						changeDummyState={changeDummyState}
					/> 
				: null}
			</div>
		</div>	
	)
}