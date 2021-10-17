import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { postComment } from './commentsSlice'
import { addCommentToLitText } from '../litTexts/litTextsSlice'
import { addCommentToUser } from '../users/allUsersSlice'
import { Grid, Paper, TextareaAutosize, Button, } from '@mui/material'
import ToggleGroup from './ToggleGroup'


export default function CommentNewForm({ litTextId, parentCommentId, replyButtonClick, isParentQuestion }) {
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
		setFormData(formData => {
			return({
				...formData,
				[e.target.name]: e.target.value,
			})
		})
		console.log("handleChange", formData)
  }

	const handleComTypes = (event, newComTypes) => {
		setFormData(formData => { 
			return ({
				...formData,
				com_type_ids: newComTypes 
			})
		})
		console.log("handleComTypes", formData.com_type_ids)
	}

	const dispatch = useDispatch()
	
  function handleSubmit(e) {
    e.preventDefault();
		dispatch(postComment(formData))
		dispatch(addCommentToLitText(formData))
		dispatch(addCommentToUser(formData))
		setFormData({
				...formData,
				content: "",
				com_type_ids: []
			})
		if (parentCommentId) replyButtonClick((prevState) => !prevState)
	}

  
  return (
		<Grid 
			item xs={12} 
			sx={{ maxWidth: 700, minWidth: 450, width: "100%" }}
		>
      <Paper sx={{ 
				maxWidth: 650, 
				px:3, pt:4, pb:1, 
				mb:2, 
				backgroundColor: "#ebe3e1" 
			}} >			
				<ToggleGroup 
					comTypes={formData.com_type_ids} 
					handleComTypes={handleComTypes} 
					// isParent={false}
					isParentQuestion={isParentQuestion} 
				/>
				<form 
					style={{ width: "100%" }} 
					onSubmit={handleSubmit} 
				> 
					<div style={{ 
						height: 10, 
						visibility: "hidden" 
					}}>
						Laborum quam praesentium. Non reiciendis facilis. Ut sunt saepe. Voluptatum facilis dignissimos. 
					</div>
					<TextareaAutosize 
						aria-label="minimum height"
						minRows={3}
						placeholder={addNewWhat}
						value={formData.content} 
						id="content"
						name="content"
						onChange={handleChange}
						style={{ width: "100%", }}
					/>
					<div style={{ 
						width: "100%", 
						display: "flex", 
						justifyContent: "center", 
						textAlign: "center"  
					}} >
						<Button 
							variant="contained" 
							type='submit' 
							sx={{ my: 2, p: 1 }}
						>
							<b>Post</b>
						</Button>
					</div>
				</form>
			</Paper>
	  </Grid>
  )
}