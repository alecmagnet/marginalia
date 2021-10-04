import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom'
import { addLoginUser } from '../users/userSlice'
import { fetchLitTexts } from '../litTexts/litTextsSlice';
import { fetchAllUsers } from '../users/allUsersSlice'
import { fetchComments} from '../comments/commentsSlice'

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [errors, setErrors] = useState([])

	const userState = useSelector((state) => state.user)
  // const user = userState.entities.length > 0 ? userState.entities[0] : null

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		})
	}

	// function onLogin(e) {
	// 	e.preventDefault();
	// 	dispatch(loginUser(formData))
	// 		.then (() => {
	// 			// if (userState.entities.length > 0 && userState.status === "idle") {
	// 			if (userState.errors.length > 0) {
	// 				setErrors([...userState.errors])
	// 			} else {
	// 				dispatch(fetchLitTexts())
	// 				dispatch(fetchAllUsers())
	// 				dispatch(fetchComments())					
	// 				setErrors([])
	// 				history.push('/')
	// 			}
	// 		}
	// 	)
  // }

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
				dispatch(addLoginUser(data))
				dispatch(fetchLitTexts())
				dispatch(fetchAllUsers())
				dispatch(fetchComments())					
				history.push('/')
			}
		});  
	}

	return (
		<div>
			{errors?errors.map(e => <div key={e.id} style={{ color: "red" }} >{e}</div>):null}
			{userState.entities.length > 0 ? <h1>You are already logged in!</h1> : null}
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