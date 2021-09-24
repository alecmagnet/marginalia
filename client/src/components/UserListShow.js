import { Fragment } from "react"
import { Link } from 'react-router-dom'

function UserListShow({ showUser, currentUser }) {
	const { username, fullname, bio, id } = showUser

	const showBio = bio ? `${bio.slice(0, 30)}...` : ""

	return (
		<Fragment>
			<div style={{ padding: 10 }} >
				<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
					<Link to={`/users/${id}`}><h3>{username}</h3></Link>
					<p>Name: {fullname}</p>
					<p>Bio: {showBio}</p> 
					{showUser.id === currentUser.id ?
						<div><p>This is the current user!</p></div>
					:
						null
					}
				</div>
			</div>
		</Fragment>
	)
}

export default UserListShow