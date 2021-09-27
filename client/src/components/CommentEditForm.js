import { useState } from "react"


export default function CommentEditForm({ comment, onEditComment, editButtonClick, wrapSetErrors, changeDummyState, forceRender }) {
	const [formData, setFormData] = useState(comment)

  function handleChange(e) {
    // e.preventDefault();
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	function handleSubmit(e) {
		e.preventDefault()
		fetch(`/comments/${comment.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})
		.then((r) => r.json())
		.then((data) => {
			console.log("EditForm:data", data)
			onEditComment(data)
			editButtonClick((prevState) => !prevState)
			// changeDummyState()
			// forceRender()
		})
		.catch((errors) => console.log(errors))
		// .catch((errors) => wrapSetErrors(errors))
	}

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