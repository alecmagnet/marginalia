import { useDispatch } from "react-redux"
import { useState } from "react"
import { patchComment } from './commentsSlice'
import { Avatar, Grid, Paper, TextareaAutosize, Checkbox, Button } from '@mui/material'


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

	const addNewWhat = comment.parentCommentId ? "Edit your reply..." : "Edit your comment..."

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
      <Paper sx={{ pr:3, pl:3, pt:4, pb:1, mb:2 }} >			
				<div style={{ position: "relative"}}>
					<Grid item sx={12} fullWidth >
						<Grid container spacing={2} wrap="nowrap" >			
							<Grid item sx={3}>
								<Avatar alt={comment.user.fullname} src={comment.user.image} />
							</Grid>
						<Grid justifyContent="left" item xs={9} >
							<form style={{ width: "100%" }} onSubmit={handleSubmit} > 
								<TextareaAutosize 
									aria-label="minimum height"
									minRows={3}
									placeholder={addNewWhat}
									value={formData.content} 
									id="content"
									name="content"
									onChange={handleChange}
									style={{ width: "100%" }}
								/>
								<div style={{ height: 10, visibility: "hidden" }}>
									Laborum quam praesentium. Non reiciendis facilis. Ut sunt saepe. Voluptatum facilis dignissimos. Sit deserunt sit. Et necessitatibus sequi.
								</div>
								<Button  variant="contained" type='submit' sx={{ mr: 5 }}>Post</Button>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Paper>

		// <div style={{ padding: 10 }} >
		// 	<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
		// 		<form style={{ 'width': '90%' }} onSubmit={handleSubmit}>
		// 			<label><p><b>Edit your comment</b></p>
		// 			<textarea 
		// 				value={formData.content} 
		// 				id="content"
		// 				name="content"
		// 				onChange={handleChange}
		// 				style={{ width: "75%" }}
		// 			/></label>
		// 			<div style={{ height: 7 }} />
		// 			<button floated="right" type='submit'>Post</button>
		// 		</form>
		// 	</div>
    // </div>
	)
}