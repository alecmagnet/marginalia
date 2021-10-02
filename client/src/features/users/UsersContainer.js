import { useSelector } from 'react-redux'
import UserListShow from './UserListShow'
// import UsersList from "./UsersList"

export default function UsersContainer() {
	const { user, entities, status } = useSelector((state) => state.users)

	if (status === "idle") {
		const otherUsers = entities.filter((u) => u.id !== user.id)
		const renderUsers = otherUsers.map((u => <UserListShow key={u.id} showUser={u} />))
		return (
			<div>{renderUsers}</div>
		)
		} else if (status === "loading") {
			return (
				<h1>Loading...</h1>
			)
		} else {
			return (
				<h1>We're sorry. There's been an error.</h1>
			)
		}


	// return (
	// 	<Fragment>
	// 		{allUsers.length > 0 ? 
	// 			<UsersList 
	// 				user={user}
	// 				allUsers={allUsers}
	// 			/>				
	// 		:
	// 			<h1>Loading...</h1>
	// 		}
	// 	</Fragment>
	// )
}

