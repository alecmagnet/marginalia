import TimeAgoContainer from "./TimeAgoContainer"
import { useState } from "react"

export default function ComRepShow({ comment, user, commentUser, onDeleteComment }) {
	const [editClicked, setEditClicked] = useState(false)
	const [errors, setErrors] = useState([])

	const [stateComment, setStateComment] = useState(comment)
	const showComment = {
		username: commentUser.username,
		fullname: commentUser.fullname,
		content: stateComment.content,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		deleted: stateComment.deleted
		// rating: stateComment.rating
	}
	const deletedComment = {
		username: "---",
		fullname: "-- --",
		content: <em>this comment was deleted by user</em>,
		created_at: stateComment.created_at,
		updated_at: stateComment.updated_at,
		deleted: true
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

	// function editButtonClick() {
	// 	setEditClicked(!editClicked)
	// }


	return (
		<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
			<h4>{renderComment.fullname}</h4>
			<div>@{renderComment.username}</div>
			<p>{renderComment.content}</p>	
			<TimeAgoContainer created_at={renderComment.created_at} updated_at={renderComment.updated_at} isDeleted={renderComment.deleted} />
			{parseInt(commentUser.id) === parseInt(user.id) ? 
			<p style={{ color: "purple" }} >
				<em>*Add edit button here*   </em> 
				{errors ? errors.map((e) => <div>{e}</div>) : null}
				<button onClick={handleDelete} >Delete</button>
			</p> : null}
		</div>	
	)
}