import { useSelector } from 'react-redux'
import UserListShow from './UserListShow'
import { Typography, Grid } from '@mui/material'

export default function UsersContainer() {
	const { entities, status } = useSelector((state) => state.allUsers)
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

	const otherUsers = entities.filter((u) => u.id !== user.id)
	const renderUsers = otherUsers.map((u => <UserListShow key={u.id} showUser={u} />))

	return(
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={9} 
				align="center" 
				justify="center">
					<Typography variant="h2" justify="center" sx={{pt:3}}>Users</Typography>
			</Grid>
			<Grid item xs={9}>

			</Grid>
			<Grid 
				item xs={9}
				>
				{status === "idle" ? 
					<div>
						{renderUsers}
					</div>
				: status === "loading" ?
					<div className="centered-in-window" >
							<h1>Loading...</h1>
					</div>
				: <div className="centered-in-window" >
							<h1>We're sorry. There's been an error</h1>
					</div>
				}
			</Grid>
		</Grid>
 	)
}