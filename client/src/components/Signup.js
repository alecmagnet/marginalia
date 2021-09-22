import { useState } from "react"

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
		username: "",
		password: "",
		fullname: "",
		image: "",
		birthdate: "",
		bio: "",
		// usertype: ""
	});

	const [errors, setErrors] = useState([])


	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		})
	}

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if(data.errors) setErrors(data.errors)
				else onLogin(data)
				setErrors([])
			});
  }

	return (
		<div>
			{errors?errors.map(e => <div style={{ color: "red" }} >{e}</div>):null}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="username"
					value={formData.username}
					placeholder={"username"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					type="text"
					id="fullname"
					value={formData.fullname}
					placeholder={"full name"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					type="text"
					id="password"
					value={formData.password}
					placeholder={"password"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					type="date"
					id="birthdate"
					value={formData.birthdate}
					// placeholder={"bio"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					type="text"
					id="image"
					value={formData.image}
					placeholder={"profile picture url"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					type="text"
					id="bio"
					value={formData.bio}
					placeholder={"bio"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<button type="submit">Signup</button>
			</form>
		</div>
  );
}

export default Signup