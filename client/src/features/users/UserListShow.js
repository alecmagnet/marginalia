import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Avatar } from '@mui/material'

export default function UserListShow({ showUser }) {
	const { username, fullname, bio, id, image } = showUser
	const firstSixty = bio ? `${bio.slice(0, 65)}` : ""
	const showBio = firstSixty.replace(/\s.\w+$/, "")

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
				<Grid container spacing={3} wrap="nowrap">
					<Grid item >
						<Avatar 
							alt={fullname} 
							src={image} 
							sx={{ width: 163, height: 163 }}
						/>
					</Grid>
					<Grid justifyContent="left" item xs={9}>
						<Typography variant="h5" sx={{ pt:"3px" }} ><b>{fullname}</b></Typography>
						<Typography variant="subtitle1" sx={{ color: "#616161", mt: -1 }} ><em>@{username}</em></Typography>
						<Typography variant="body2" sx={{ mt: 2, mb: 2 }} ><span style={{ color: "#494949", fontSize: 19 }} >B<span style={{ fontVariant: "small-caps", fontSize: 21 }} >io</span>:</span> {showBio}&nbsp;.&nbsp;.&nbsp;.</Typography> 
						<TotalCommentsAndReplies Id={showUser.id} source="user" />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}