import { useDispatch } from "react-redux"
import { useState } from "react"
import { patchComment } from './commentsSlice'


export default function CommentEditForm({ comment, editButtonClick }) {
	const [formData, setFormData] = useState(comment)

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	const dispatch = useDispatch()
	
  function handleSubmit(e) {
    e.preventDefault();
		dispatch(patchComment(formData))
		.then(() => {
			editButtonClick((prevState) => !prevState)
		})
	}

	// function handleSubmitOLD(e) {
	// 	e.preventDefault()
	// 	fetch(`/comments/${comment.id}`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(formData)
	// 	})
	// 	.then((r) => r.json())
	// 	.then((data) => {
	// 		console.log("EditForm:data", data)
	// 		handleEditComment(data)
	// 		onEditComment(data)
	// 		editButtonClick((prevState) => !prevState)
	// 		// changeDummyState()
	// 		// forceRender()
	// 	})
	// 	.catch((errors) => wrapSetErrors(errors))
	// }

	return (
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<form style={{ 'width': '90%' }} onSubmit={handleSubmit}>
					<label><p><b>Edit your comment</b></p>
					<textarea 
						value={formData.content} 
						id="content"
						name="content"
						onChange={handleChange}
						style={{ width: "75%" }}
					/></label>
					<div style={{ height: 7 }} />
					<button floated="right" type='submit'>Post</button>
				</form>
			</div>
    </div>
	)
}