import { Fragment } from "react"
import UsersList from "./UsersList"

function UsersContainer({ user, allUsers }) {


	return (
		<Fragment>
			{allUsers.length > 0 ? 
				<UsersList 
					user={user}
					allUsers={allUsers}
				/>				
			:
				<h1>Loading...</h1>
			}
		</Fragment>
	)
}

export default UsersContainer