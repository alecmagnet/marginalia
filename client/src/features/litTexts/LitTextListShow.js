import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Card } from '@mui/material'

export default function LitTextListShow({ litText }) {
	const { title, author, pubdate, content, id, prose } = litText

	let parsedContent = ""
	if (content && prose) {
		parsedContent = content.replace(/(<([^>]+)>)/gi, " ")
	} else if (content && !prose) {
		let p = content.replaceAll('</p><br/>', " // ")
			.replaceAll('</p><br>', " // ")
			.replaceAll('<br/><br/>', " // ")
			.replaceAll('</p>', " / ")
			.replaceAll('<br>', " / ")
			.replaceAll('<br/>', " / ")
		// let p1 = content.replaceAll('</p><br/>', " // ")
		// let p2 = p1.replaceAll('</p>', " / ")
		// let p3 = p2.replaceAll('<br>', " / ").replaceAll('<br/>', " / ")
		parsedContent = p.replace(/(<([^>]+)>)/gi, " ")
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
				onClick={handlePaperClick}
			>
				<Typography variant="h5" sx={{ textAlign:"center" }}><b>{title}</b></Typography>
				<Typography variant="subtitle1" sx={{ textAlign:"center" }}>{author}</Typography>
				<Typography variant="body2" sx={{ textAlign:"center", color: "#494949" }}>{pubdate}</Typography>
				<Card variant="outlined" sx={{ p:2, pt: 0, mt:2, mb:2, backgroundColor: "#fefcf9" }}>
					<Typography sx={{ fontSize: 14, textAlign:"center", mt:1 }} color="text.secondary" gutterBottom>
						<em>Preview</em>
					</Typography>				
					<Typography variant="body1">{showContent}&nbsp;.&nbsp;.&nbsp;.</Typography> 
				</Card>
				<div style={{ display:"flex", width: "100%", justifyContent: "center", }}>
					<TotalCommentsAndReplies Id={litText.id} source="litText" />				
				</div>
			</Paper>
		</Grid>
	)
}