import { useParams, Redirect } from 'react-router-dom'
import { Fragment } from "react"

function UserShow({ user, allUsers }) {
	const params = useParams()
	const showUser = allUsers.filter((u) => parseInt(u.id) === parseInt(params.id))[0]

	return (
		<Fragment>
			{showUser ?
				<div>
					<h2>Username: {showUser.username}</h2>
					<h2>Full name: {showUser.fullname}</h2>
					<p>Bio: {showUser.bio}</p> 
					{showUser.id === user.id ?
						<div><p>This is the current user!</p></div>
					: null}
				</div>
			: <Redirect to='/users'/>}
		</Fragment>
	)
}

export default UserShow