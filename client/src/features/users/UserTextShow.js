import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Paper, Grid, Typography } from '@mui/material'
import UserTextComPreview from './UserTextComPreview'

export default function UserTextShow({ id, comments }) {
  const litTextsArr = useSelector((state) => state.litTexts.entities)

	let litText = []
	let renderComments = []
	if (litTextsArr.length > 0) {
		litText = litTextsArr.find((t) => t.id === id)
		let commentsArr = comments.filter((c) => c.lit_text_id === id)
		renderComments = commentsArr.map((c) => {
			return(<UserTextComPreview key={`ltc${c.id}`} comment={c} />)
		})
	}
	
	const history = useHistory()
	const handleClick = () => {
		history.push(`/texts/${id}`)
	}

	return(
		<Grid item xs={12} alignItems="center">
			<Grid 
				container 
				justifyContent="Center"	
				alignItems="center"
			>
				<Grid item xs={9}> 
					<Paper sx={{ cursor: "pointer", bgcolor: "f5f5f5", mb:1, pb: "15px", }} onClick={() => handleClick()} >
				<Typography variant="subtitle1" sx={{ pt: 2, m: 2, mb: 0 }} >
					<b>{litText.title}</b>
				</Typography>
				<Typography variant="body2" sx={{ ml: 2, }} >
					{litText.author}
				</Typography>				
				<Typography variant="caption" sx={{ ml: 2, }} >
					{litText.pubdate}
				</Typography>
				<div>
				{renderComments.length > 0 ? renderComments : "previews loading..."}
				</div>
			</Paper>
				</Grid>
			</Grid>
		</Grid>
	)
}