import { useState, Fragment } from "react"
import Login from './Login'
import Signup from './Signup'

function LoginContainer({ onLogin }) {
	const [hasAccount, setHasAccount] = useState(true)

	function handleClick() {
		setHasAccount(!hasAccount)
	}

	return (
		<Fragment>
			{ hasAccount ? 
				<div style={{ padding: 15 }} >
					<Login onHandleClick={handleClick} onLogin={onLogin} />
					<div style={{ paddingTop: 10, paddingBottom: 10 }} >or</div>
					<button onClick={handleClick} >Signup for a New Account</button>
				</div>
			:
				<div style={{ padding: 15 }} >
					<Signup onLogin={onLogin} />
					<div style={{ paddingTop: 10, paddingBottom: 10 }} >or</div>
					<button onClick={handleClick} >Login</button>
				</div>
			}
		</Fragment>
	) 
}

export default LoginContainer