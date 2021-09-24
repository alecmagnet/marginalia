import UserListShow from "./UserListShow";
// import { useState } from "react"

export default function UsersList({ user, allUsers }) {

	const renderUsers = allUsers.map((u => <UserListShow key={u.id} showUser={u} currentUser={user} />))

	return (
		<div>
			{renderUsers}
		</div>
	)
}