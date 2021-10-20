import { Card, Typography } from '@mui/material'
import TimeAgoContainer from "../shared/TimeAgoContainer"

export default function UserTextComPreview({ comment }) {
	
	const contentSlice = comment.content.slice(0, 35)
	const showContent = contentSlice.replace(/\s.\w+$/, "")

	return(
		// <Grid item sx={{ m: 2, ml: 5, mr: 3, p: 2, pr: 4, bgcolor: "#fefcf9", borderRadius: 3, borderStyle: "groove", borderColor: "#4e342e" }}>
		<Card variant="outlined" sx={{ m: 2, mx: 3, p: 2, pr: 4, bgcolor: "#fefcf9", borderRadius: 1,  }}>
				<Typography variant="caption" sx={{ color: "#373737", }} >
					<TimeAgoContainer
						created_at={comment.created_at} 
						updated_at={comment.updated_at} 
						isDeleted={comment.deleted} 	
						fromLitTextShow={false}						
					/>
					</Typography>
					<Typography variant="body2" sx={{ }} >{showContent}&nbsp;.&nbsp;.&nbsp;.</Typography>
			</Card>
			// </Grid>
		)
}