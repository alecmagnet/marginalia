import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Avatar, Card } from '@mui/material'

export default function UserHomePageShow({ showUser }) {
	const { username, fullname, bio, id, image } = showUser
	const firstSixty = bio ? `${bio.slice(0, 60)}` : ""
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
				<Grid container spacing={2} >
					<Grid item sx={3}>
						<Avatar 
							alt={fullname} 
							src={image} 
							sx={{ width: 60, height: 60, mt: "7px" }}
						/>
					</Grid>
					<Grid item justifyContent="left" xs={8}>
						<Typography variant="h5"><b>{fullname}</b></Typography>
						<Typography variant="subtitle1"><em>@{username}</em></Typography>
					</Grid>
					<Grid item justifyContent="left" xs={12}>
						<Card variant="outlined" sx={{ p:1, pt: 0, mt:0, mb:2, backgroundColor: "#fefcf9" }}>
							<Typography sx={{ fontSize: 14, textAlign:"center", mt:1 }} color="text.secondary" gutterBottom>
								<em>Bio</em>
							</Typography>				
							<Typography variant="body2">{showBio}&nbsp;.&nbsp;.&nbsp;.</Typography> 
						</Card>
						<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
							<TotalCommentsAndReplies Id={showUser.id} source="user" />
						</div>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}