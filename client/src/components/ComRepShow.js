import { useState } from "react"
import TimeAgoContainer from "./TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"

export default function ComRepShow({ comment, user, commentUser, onDeleteComment, changeDummyState }) {
	const [editClicked, setEditClicked] = useState(false)
	const [errors, setErrors] = useState([])

	const skull = <span role="img" aria-label="skull and ghost">💀 👻</span>

	const [stateComment, setStateComment] = useState(comment)
	const showComment = {
		fullname: commentUser.fullname,
		username: commentUser.username,
		content: stateComment.content,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		deleted: stateComment.deleted,
		id: stateComment.id
		// rating: stateComment.rating
	}
	const deletedComment = {
		fullname: skull,
		username: "",
		content: <em>this comment was deleted by user</em>,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		deleted: true,
		id: stateComment.id
		// rating: "-"
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

	function onEditComment(data) {
		console.log("onEditComment:data", data)
		setStateComment(data)
		console.log("onEditComment:stateComment", stateComment)
	}

	function wrapSetErrors(data){
		setErrors(data)
	}

	function editButtonClick() {
		setEditClicked(!editClicked)
	}


	return (
		<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
			<h4>{renderComment.fullname}</h4>
			{renderComment.deleted ? null : <div>@{renderComment.username}</div>}
			<p>{renderComment.content}</p>	
			<TimeAgoContainer 
				created_at={renderComment.created_at} 
				updated_at={renderComment.updated_at} 
				isDeleted={renderComment.deleted} />
			{parseInt(commentUser.id) === parseInt(user.id) && !renderComment.deleted ? 
			<div>
				{errors ? errors.map((e) => <div>{e}</div>) : null}
				<button onClick={editButtonClick} >Edit</button>
				<button onClick={handleDelete} style={{marginLeft: 6}} >Delete</button>
				{editClicked ? 
					<CommentEditForm 
						comment={renderComment}
						onEditComment={onEditComment}
						editButtonClick={editButtonClick}
						wrapSetErrors={wrapSetErrors}
						changeDummyState={changeDummyState}
					/> : null}
			</div> : null}
		</div>	
	)
}