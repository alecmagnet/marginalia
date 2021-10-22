import TimeAgo from "./TimeAgo";
import { Typography, Box } from '@mui/material'

export default function TimeAgoContainer({ created_at, updated_at, isDeleted, fromLitTextShow, uploader, handleUploaderClick }) {

	const includeUploaded = () => {
		if (fromLitTextShow) {
			return (
				<Box 
					component="span" 
					onClick={handleUploaderClick}
					sx={{ 
						cursor: "pointer",
					}}
				>
					uploaded by <Box 
						component="span" 
						sx={{textDecoration: "underline"}}
					>
						{uploader}
					</Box>
				</Box> 
			)
		} else {
			return null
		} 
	}
	const secondTerm = isDeleted ? " (deleted " : " (updated "

	return (
		<Typography variant="caption" sx={{ color: "#757575", mb: 1 }} >
			<em>{includeUploaded()} <TimeAgo time={created_at} /></em>
			{created_at === updated_at ? 
				null :
				<em>
					{secondTerm}
					<TimeAgo time={updated_at} />
					)
				</em>
			}
		</Typography>
	)
}