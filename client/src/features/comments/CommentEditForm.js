import { useDispatch } from "react-redux"
import { useState } from "react"
import { patchComment } from './commentsSlice'
import { Paper, TextareaAutosize, Button } from '@mui/material'
import ToggleGroup from './ToggleGroup'


export default function CommentEditForm({ comment, editButtonClick }) {
	const comTypes = comment.com_types.map(type => type.id)
	const [formData, setFormData] = useState({
		id: comment.id,
		user_id: comment.user.id,
		lit_text_id: comment.litTextId,
		parent_comment_id: comment.parent_comment_id,
		content: comment.content,
		com_type_ids: [...comTypes]
	})
	const dispatch = useDispatch()
	const addNewWhat = comment.parentCommentId ? "Edit your reply..." : "Edit your comment..."
	const isParent = comment.parentCommentId ? true : false
	console.log("CommentEditForm", formData)

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
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
	
  function handleSubmit(e) {
    e.preventDefault();
		dispatch(patchComment(formData))
		editButtonClick((prevState) => !prevState)
	}


	return (
		<Paper sx={{ 
			px:3, pt:4, 
			pb:1, mb:2, 
			backgroundColor: "#ebe3e1" 
		}} >			
			<ToggleGroup 
				comTypes={formData.com_type_ids} 
				handleComTypes={handleComTypes} 
				isParent={isParent} 
			/>			
			<form style={{ width: "100%" }} onSubmit={handleSubmit} > 
				<div style={{ height: 10, visibility: "hidden" }}>
					Laborum quam praesentium. Non reiciendis facilis. Ut sunt saepe. 
				</div>
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
	)
}