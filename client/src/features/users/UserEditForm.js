import { useState } from "react"
import { useDispatch } from "react-redux"
import { Paper, Typography, Button } from '@mui/material'
import { updateUser } from './allUsersSlice'
import { updateShowUser } from "./showUserSlice"

export default function UserEditForm({ user, handleUpdatedUser }){
	const [formData, setFormData] = useState(user)

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	const dispatch = useDispatch()	

	const onUpdateUser = (data) => {
		dispatch(updateUser(data))
		dispatch(updateShowUser(data))
	}	

	function handleSubmit(e) {
		e.preventDefault()
		fetch(`/users/${user.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})
		.then((r) => r.json())
		.then((data) => {
			onUpdateUser(data)
			setFormData(data)
			handleUpdatedUser()
		})
		.catch((errors) => console.log(errors))
	}	

	return(
		<Paper variant="outlined" sx={{ mx: 10, bgcolor: "#fefcf9", justifyContent: "center" }} >
			<div style={{ display: "flex", justifyContent: "center", padding: 5 }} >
				<form style={{ 'width': '90%' }} onSubmit={handleSubmit}>
					<label>
						<Typography variant="h5" sx={{ color: "#fff", textAlign: "center", mt: 2, mb:1, }}>
							<b>Bio</b>
						</Typography>
					<textarea 
						value={formData.bio} 
						id="bio"
						name="bio"
						onChange={handleChange}
						style={{ width: "99%" }}
					/></label>
					<label>
						<Typography variant="h5" sx={{ color: "#fff", textAlign: "center", mt: 2, mb: 1, }}>
							<b>Profile Picture</b>
						</Typography>
					<textarea 
						value={formData.image} 
						placeholder="add image url"
						id="image"
						name="image"
						onChange={handleChange}
						style={{ width: "99%" }}
					/></label>
					<div style={{ textAlign: "center" }} >
					<Button 
						variant="outlined"
						sx={{textAlign: "center", p: 1, m: 2, color: "#3e2723", }} 
						type='submit'>
							<Typography variant="button" sx={{ color: "fff", }} >Submit</Typography></Button>
					</div>
				</form>
			</div>
    </Paper>
	)
}