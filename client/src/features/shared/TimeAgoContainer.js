import TimeAgo from "./TimeAgo";
import { Typography } from '@mui/material'

export default function TimeAgoContainer({ created_at, updated_at, isDeleted, fromLitTextShow, uploader, editor }) {

	const includeUploaded = fromLitTextShow ? `uploaded by ${uploader}` : null 
	const secondTerm = isDeleted ? " (deleted " : " (updated "

	return (
		<Typography variant="caption" sx={{ color: "#757575", mb: 1 }} >
			<em>{includeUploaded} <TimeAgo time={created_at} /></em>
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