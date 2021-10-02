import { Fragment } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../users/userSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const history = useHistory()

	const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

  function handleLogout() {
    dispatch(logoutUser())
    history.push('/login')
	}

	return (
		<header style={{ backgroundColor: "Gainsboro", 'paddingTop':5, 'paddingBottom':5 }} >
			<Link to='/' style={{ 'paddingLeft':15, 'paddingRight':15, fontSize:30 }} >Marginalia</Link>
			{/* {user && allUsers ? */}
			{userState.entities.length > 0 ?
				<Fragment>
					<Link to='/users'>Users</Link>
					<Link to='/texts' style={{ 'paddingLeft':15}} >Texts</Link>
				</Fragment>
			: null}
			{userState.entities.length > 0 ? 
				<Fragment>
					<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} >
						<span style={{'paddingLeft':15, 'paddingRight':15}}>Welcome, <Link to={`/users/${user.id}`} >{user.fullname}</Link></span>
						<button onClick={handleLogout}>Logout</button>
					</span>				
				</Fragment>
			:
				<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} ><b><Link to='/'>Please login</Link></b></span>
			}
		</header>
	)
}