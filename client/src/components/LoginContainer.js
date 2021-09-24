import { Switch, Route, Link } from 'react-router-dom';
// import { useState, Fragment } from "react"
import Login from './Login'
import Signup from './Signup'

function LoginContainer({ onLogin }) {
	// const [hasAccount, setHasAccount] = useState(true)

	// function handleClick() {
	// 	setHasAccount(!hasAccount)
	// }

	return (
		<Switch>
			<Route exact path='/'>
				<div style={{ padding: 15 }} >
					<Login onLogin={onLogin} />
					<Link to='/signup'>Don't have an account? Sign up</Link>
				</div>
			</Route>
			<Route exact path='/signup'>
				<div style={{ padding: 15 }} >
					<Signup onLogin={onLogin} />
					<Link to='/'>Already have an account? Log in</Link>
				</div>
			</Route>
			{/* { hasAccount ? 
				<div style={{ padding: 15 }} >
				<Login onLogin={onLogin} />
				<div className="txt-centered-in-div" >or</div>
				<button 
				onClick={handleClick} 
				className="centered-in-div" 
				>Signup for a New Account</button>
				</div>
				:
				<div style={{ padding: 15 }} >
				<Signup onLogin={onLogin} />
				<div className="txt-centered-in-div" >or</div>
				<button onClick={handleClick} className="centered-in-div" >Login to Your Account</button>
				</div>
			} */}
			</Switch>
	) 
}

export default LoginContainer