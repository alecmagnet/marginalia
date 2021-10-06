import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper } from '@mui/material'

export default function UserListShow({ showUser }) {
	const { username, fullname, bio, id } = showUser
	const showBio = bio ? `${bio.slice(0, 60)}...` : ""

	const history = useHistory()
	const handlePaperClick = () => {
		history.push(`/users/${id}`)
	}
	
	return (
		<Grid item >
			<Paper 
				elevation={6} 
				sx={{ p:3, m: 3, cursor: "pointer", backgroundColor: "#fffaf5" }}
				onClick={handlePaperClick}
			>
				<Typography variant="h5"><b>{fullname}</b></Typography>
				<Typography variant="subtitle1"><em>@{username}</em></Typography>
				<Typography variant="body2" sx={{ mt: 2, mb: 2 }} ><span style={{ color: "#494949", fontSize: 19 }} >B<span style={{ fontVariant: "small-caps", fontSize: 21 }} >io</span>:</span> {showBio}. . .</Typography> 
				{/* <Typography variant="body2" sx={{ mt: 2, mb: 2 }} ><b><em>Bio:</em></b> {showBio}. . .</Typography>  */}
				<TotalCommentsAndReplies Id={showUser.id} source="user" />
			</Paper>
		</Grid>
	)
}