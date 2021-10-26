import { Card, Typography } from '@mui/material'
import TimeAgoContainer from "../shared/TimeAgoContainer"

export default function UserTextComPreview({ comment }) {
	
	return(
		<Card sx={{ m: 2, mx: 3, p: 2, pr: 4, borderRadius: 1,  }}>
				<Typography variant="caption" sx={{ color: "#373737", }} >
					<TimeAgoContainer
						created_at={comment.created_at} 
						updated_at={comment.updated_at} 
						isDeleted={comment.deleted} 	
						fromLitTextShow={false}						
					/>
					</Typography>
					<Typography variant="body2" sx={{ }} >{comment.content}</Typography>
			</Card>
		)
}