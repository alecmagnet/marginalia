import { useParams, Redirect } from 'react-router-dom'
import { Fragment, useState } from "react"
import UserEditForm from './UserEditForm'

function UserShow({ user, allUsers }) {
	const [editClicked, setEditClicked] = useState(false)

	const params = useParams()
	const findUser = allUsers.filter((u) => parseInt(u.id) === parseInt(params.id))[0]
	const [showUser, setShowUser] = useState(findUser)

	function editButtonClick() {
		setEditClicked(!editClicked)
	}

	function updateUser(data) {
		setShowUser(data)
		setEditClicked(!editClicked)
	}

	return (
		<Fragment>
			{showUser ?
				<div>
					<img src={showUser.image} alt={`${showUser.fullname}'s avatar'`} style={{ width: 300 }} />
					<h2>{showUser.fullname}</h2>
					<h3><em>@{showUser.username}</em></h3>
					<p>Bio: {showUser.bio}</p> 
					{showUser.id === user.id ?
						<div>
							<button onClick={editButtonClick} >Edit</button>
							{editClicked ?
								<UserEditForm 
								user={user}
								updateUser={updateUser} /> 
							: null}
						</div>
					: null}
				</div>
			: <Redirect to='/users'/>}
		</Fragment>
	)
}

export default UserShow