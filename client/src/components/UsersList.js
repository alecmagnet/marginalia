import UserListShow from "./UserListShow";
// import { useState } from "react"

export default function UsersList({ user, allUsers }) {

	const otherUsers = allUsers.filter((u) => u.id !== user.id)
	const renderUsers = otherUsers.map((u => <UserListShow key={u.id} showUser={u} />))

	return (
		<div>
			{renderUsers}
		</div>
	)
}