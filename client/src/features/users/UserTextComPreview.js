import { Grid, Divider, Typography } from '@mui/material'
import TimeAgoContainer from "../shared/TimeAgoContainer"

export default function UserTextComPreview({ comment }) {
	
	const contentSlice = comment.content.slice(0, 35)
	const showContent = contentSlice.replace(/\s.\w+$/, "")

	return(
		<Grid item sx={{ ml: 5, pr: 2}}>
			<Divider variant="fullWidth" sx={{ m: "15px 0 15px 5px", pr: 3 }} />
				<Typography variant="caption" sx={{ color: "#373737", }} >
					<TimeAgoContainer
						created_at={comment.created_at} 
						updated_at={comment.updated_at} 
						isDeleted={comment.deleted} 							
					/>
					</Typography>
					<Typography variant="body2" sx={{ mb: "15px"}} >{showContent}&nbsp;.&nbsp;.&nbsp;.</Typography>
			</Grid>
		)
}