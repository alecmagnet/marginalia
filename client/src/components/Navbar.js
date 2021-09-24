import { Fragment } from "react"
import { Link } from 'react-router-dom'

function Navbar({ onLogout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => onLogout())
  }

	return (
		<header style={{ backgroundColor: "Gainsboro", 'paddingTop':20, 'paddingBottom':20 }} >
			<Link to='/' style={{ 'paddingLeft':15, 'paddingRight':15, fontSize:30 }} >Marginalia</Link>
			{user ? 
				<Fragment>
					<span style={{ float: "right", 'paddingRight':15 }} >
						<span style={{'paddingLeft':15, 'paddingRight':15}}>Welcome, <Link to={`/x-users/${user.id}`} >{user.username}</Link></span>
						<button onClick={handleLogout}>Logout</button>
					</span>				
				</Fragment>
			:
				<h1>Please login</h1>
			}
		</header>
	)
}

export default Navbar