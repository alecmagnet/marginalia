import TimeAgoContainer from "./TimeAgoContainer"
import { useState } from "react"

export default function ComRepShow({ comment, user, commentUser, onDeleteComment }) {
	const [editClicked, setEditClicked] = useState(false)
	const [errors, setErrors] = useState([])
	const [renderComment, setRenderComment] = useState(comment)

	// const deletedParent = {

	// }

	function onDeleteClick(e) {
		e.preventDefault()
		console.log(comment)
	}

	function handleDelete(e) {
		e.preventDefault()
		onDeleteComment(comment.id)
		fetch(`/comments/${comment.id}`, {
			method: "DELETE"
		})
		.then((r) => r.json())
		.then((data) => {
			if (data.errors) setErrors(data.errors)
		})
	}

	function editButtonClick() {
		setEditClicked(!editClicked)
	}


	return (
		<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
			<h4>{commentUser.username}</h4>
			<p>{comment.content}</p>	
			<TimeAgoContainer created_at={comment.created_at} updated_at={comment.updated_at} />
			{parseInt(commentUser.id) === parseInt(user.id) ? 
			<p style={{ color: "purple" }} >
				<button onClick={onDeleteClick} >Delete</button>
				<em>**Add edit and delete buttons here**</em></p> 
			: null}
		</div>	
	)
}