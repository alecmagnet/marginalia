import { useState } from "react"

export default function UserEditForm({ user, updateUser }){
	const [formData, setFormData] = useState(user)

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
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
			updateUser(data)
		})
		.catch((errors) => console.log(errors))
	}	

	return(
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<form style={{ 'width': '90%' }} onSubmit={handleSubmit}>
					<label><p><b>Bio</b></p>
					<textarea 
						value={formData.bio} 
						id="bio"
						name="bio"
						onChange={handleChange}
						style={{ width: "75%" }}
					/></label>
					<label><p><b>Bio</b></p>
					<textarea 
						value={formData.image} 
						id="image"
						name="image"
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