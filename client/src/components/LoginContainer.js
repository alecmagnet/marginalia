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
			}
		</Fragment>
	) 
}

export default LoginContainer