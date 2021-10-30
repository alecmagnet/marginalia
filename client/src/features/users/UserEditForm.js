import { useState } from "react"
import { useDispatch } from "react-redux"
import LastName from "../litTexts/litTextNewForm/LastName" 
import { Paper, Button, Box, TextField } from '@mui/material'
import { updateUser } from './allUsersSlice'
import { updateShowUser } from "./showUserSlice"
import { updateCurrentUser } from "./userSlice"

export default function UserEditForm({ user, scrollToTop }){
	const [formData, setFormData] = useState(user)
	const { first_name, last_name, fam_name_first, bio, image } = formData

	// useEffect(() => {
	// 	setAnchorTarget(document.getElementById(top))
	// }, [top])

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	const handleFamNameFirstClick = () => {
		setFormData({
			...formData,
			fam_name_first: !fam_name_first,
		})		
	}

	const dispatch = useDispatch()	

	const onUpdateUser = (data) => {
		dispatch(updateUser(data))
		dispatch(updateShowUser(data))
		dispatch(updateCurrentUser(data))
	}	

	function handleSubmit(e) {
		e.preventDefault()
		fetch(`/api/users/${user.id}`, {
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
			scrollToTop()
		})
		.catch((errors) => console.log(errors))
	}	

	return(
		<Paper variant="outlined" sx={{ mx: 5, mt: 3, pt: 4, bgcolor: "#ebe3e1", justifyContent: "center" }} >
			<Box component="form" onSubmit={handleSubmit} sx={{ justifyContent: "center", }}>
				<LastName 
					famNameFirst={fam_name_first} 
					handleFamNameFirstClick={handleFamNameFirstClick} 
					handleFormChange={handleChange} 
					firstName={first_name}
					lastName={last_name}
					isAuthor={false}
				/>
				{/* TODO: Dry up this code by mapping through an array of options */}
				<TextField 
					value={bio} 
					id="bio"
					label="Bio"
					name="bio"
					onChange={handleChange}
					sx={{ width: "90%", mx: "5%", mt: 1, backgroundColor: "#fff",  }}
				/>
				<TextField 
					value={image} 
					label="Picture URL"
					id="image"
					name="image"
					onChange={handleChange}
					sx={{ width: "90%", mx: "5%", mt: 3, backgroundColor: "#fff",  }}
				/>
				<div style={{ textAlign: "center" }} >
				<Button 
					variant="contained"
					sx={{textAlign: "center", p: 1, m: 2, my: 3, color: "fff", }} 
					type='submit'>
						Submit
				</Button>
				</div>
			</Box>
    </Paper>
	)
}