import { useState} from "react"
import { Link } from 'react-router-dom'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
		username: "",
		password: "",
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
		fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		.then((r) => r.json())
		.then((data) => {
			if(data.errors) setErrors(data.errors)
			else {
				setErrors([])
				onLogin(data)
			}
		});  
	}

	return (
		<div>
			{errors?errors.map(e => <div style={{ color: "red" }} >{e}</div>):null}
			<form onSubmit={handleSubmit}>
				<input
					className="centered-in-div" 
					type="text"
					id="username"
					value={formData.username}
					placeholder={"username"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					className="centered-in-div" 
					type="password"
					id="password"
					value={formData.password}
					placeholder={"password"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<button type="submit" className="centered-in-div" >Login</button>
			</form>
        <div style={{ paddingTop: 10 }} />
				<Link to='/signup'>Don't have an account? Sign up</Link>
		</div>
  );
}

export default Login