import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { postComment } from './commentsSlice'
import { Avatar, Grid, Paper, TextareaAutosize, Checkbox, Button } from '@mui/material'



export default function CommentNewForm({ litTextId, parentCommentId, replyButtonClick }) {
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

  const [formData, setFormData] = useState({
		user_id: user.id,
		lit_text_id: litTextId,
		parent_comment_id: parentCommentId,
		content: "",
		com_type_ids: []
	});

	const addNewWhat = parentCommentId ? "Post a new reply..." : "Post a new comment..."

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	function handleCheck(e) {
		console.log("fired")
		if (!formData.com_type_ids.includes(parseInt(e.target.value))) {
			let comTypes = [...formData.com_type_ids, parseInt(e.target.value)]
			setFormData({
				...formData,
				com_type_ids: [...comTypes],
			})
		} else {
			let comTypes = formData.com_type_ids.filter((c) => parseInt(c) !== parseInt(e.target.value))
			setFormData({
				...formData,
				com_type_ids: [...comTypes],
			})
		}
	}

	const dispatch = useDispatch()
	
  function handleSubmit(e) {
    e.preventDefault();
		dispatch(postComment(formData))
		.then(() => {
			setFormData({
				...formData,
				content: ""
			})
			if (parentCommentId) replyButtonClick((prevState) => !prevState)
		})
	}

  
  return (
		<Grid 
			item xs={12} sx={{ maxWidth: 700, minWidth: 500, width: "100%" }}
		>
      <Paper sx={{ pr:3, pl:3, pt:4, pb:1, mb:2 }} >			
				<div style={{ position: "relative"}}>
					<Grid item sx={12} fullWidth >
						<Grid container spacing={2} wrap="nowrap" >			
							<Grid item sx={3}>
								<Avatar alt={user.fullname} src={user.image} />
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
								<label>
									<Checkbox id="1" name="reading" value="1" onChange={(e) => handleCheck(e)} />Reading
								</label>
								<label>
									<Checkbox id="2" name="question" value="2" onChange={(e) => handleCheck(e)} />Question
								</label>
								<label>
									<Checkbox id="3" name="footnote" value="3" onChange={(e) => handleCheck(e)} />Footnote
								</label>
								{parentCommentId ? 
									<label>
										<Checkbox id="4" name="answer" value="4" onChange={(e) => handleCheck(e)} />Footnote
									</label>
								: null}
								<div style={{ height: 9 }} />
							</form>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Paper>
	  </Grid>
  )
}