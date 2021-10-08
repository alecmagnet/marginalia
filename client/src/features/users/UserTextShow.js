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
					<Paper sx={{ cursor: "pointer", bgcolor: "#424242", m: 2, mt: 0, pb: "5px", borderRadius: 2, }} onClick={() => handleClick()} >
				<Typography variant="h6" sx={{ textAlign: "center", color: "#fff", pt: 1, mx: 1, }} >
					<b>{litText.title}</b>
				</Typography>
				<Typography variant="subtitle1" sx={{ textAlign: "center", color: "#fff", }} >
					{litText.author}
				</Typography>				
				{/* <Typography variant="subtitle2" sx={{ textAlign: "center", color: "#fff", ml: 1, }} >
					<em>{litText.pubdate}</em>
				</Typography> */}
				<div>
				{renderComments.length > 0 ? renderComments : "previews loading..."}
				</div>
			</Paper>
				</Grid>
			</Grid>
		</Grid>
	)
}