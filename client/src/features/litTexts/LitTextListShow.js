import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Card } from '@mui/material'

export default function LitTextListShow({ litText }) {
	const { title, author, pubdate, content, id, prose } = litText

	let parsedContent = ""
	if (content && prose) {
		parsedContent = content.replace(/(<([^>]+)>)/gi, " ")
	} else if (content && !prose) {
		let p1 = content.replaceAll('<br/>', " / ")
		let p2 = p1.replaceAll('</p>', " // ")
		parsedContent = p2.replace(/(<([^>]+)>)/gi, " ")
	}
	const firstHundred = parsedContent.slice(0, 150)
	const showContent = firstHundred.replace(/\s.\w+$/, "")

	const history = useHistory()
	const handlePaperClick = () => {
		history.push(`/texts/${id}`)
	}

	return (
		<Grid item >
			<Paper 
				elevation={6} 
				sx={{ p:3, m: 3, cursor: "pointer", backgroundColor: "#fffaf5" }}
				onClick={handlePaperClick}>
				<Typography variant="h5"><b>{title}</b></Typography>
				<Typography variant="subtitle1">{author}</Typography>
				<Typography variant="body2"><em>{pubdate}</em></Typography>
				<Card variant="outlined" sx={{ p:2, mt:2, mb:2, backgroundColor: "#fefcf9" }}>
				<Typography variant="body1">{showContent}&nbsp;.&nbsp;.&nbsp;.</Typography> 
				</Card>
				<TotalCommentsAndReplies Id={litText.id} source="litText" />				
			</Paper>
		</Grid>
	)
}