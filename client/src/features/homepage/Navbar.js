import { Fragment } from "react"
import { Link } from 'react-router-dom'

function Navbar({ onLogout, user, allUsers }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => onLogout())
  }

	return (
		<header style={{ backgroundColor: "Gainsboro", 'paddingTop':5, 'paddingBottom':5 }} >
			<Link to='/' style={{ 'paddingLeft':15, 'paddingRight':15, fontSize:30 }} >Marginalia</Link>
			{user && allUsers ?
				<Fragment>
					<Link to='/users'>Users</Link>
					<Link to='/texts' style={{ 'paddingLeft':15}} >Texts</Link>
				</Fragment>
			: null}
			{user ? 
				<Fragment>
					<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} >
						<span style={{'paddingLeft':15, 'paddingRight':15}}>Welcome, <Link to={`/x-users/${user.id}`} >{user.fullname}</Link></span>
						<button onClick={handleLogout}>Logout</button>
					</span>				
				</Fragment>
			:
				<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} ><b><Link to='/'>Please login</Link></b></span>
			}
		</header>
	)
}

export default Navbar