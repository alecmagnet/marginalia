import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserEditForm from './UserEditForm'
import { fetchUserById } from './showUserSlice'

export default function UserShow() {
	const [editClicked, setEditClicked] = useState(false)
	
	const params = useParams()
	const dispatch = useDispatch()

	useEffect(() => dispatch(fetchUserById(params.id)), [])
	const { entities:showUser, status:showUserStatus } = useSelector((state) => state.showUser)
	const user = useSelector((state) => state.user.entities)

	function editButtonClick() {
		setEditClicked(!editClicked)
	}

	function updateUser(data) {
		// setShowUser(data) DISPATCH PATCH REQUEST HERE OR IN EDIT FORM?
		setEditClicked(!editClicked)
	}

	// const renderLitTexts = user.comments ? user.comments.map((c) => console.log(c)) : null

	if (showUserStatus === "idle") {
		return (
			<div className="centered-in-window" style={{ textAlign: "center" }} >
				<img src={showUser.image} alt={`${showUser.fullname}'s avatar'`} style={{ width: 300, height: 300 }} />
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
		)
	} else if (showUserStatus === "loading") {
		return (
			<h1>Loading...</h1>
		)
	} else {
		return (
			<h1>We're sorry. There's been an error.</h1>
		)
	}
}