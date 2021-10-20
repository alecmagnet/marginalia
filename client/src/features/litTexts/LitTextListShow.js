import { useHistory } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Card } from '@mui/material'

export default function LitTextListShow({ litText }) {
	const { title, first_name, last_name, pubdate, content, id, prose, translator, fam_name_first } = litText

	let parsedContent = ""
	if (content && prose) {
		parsedContent = content.replace(/(<([^>]+)>)/gi, " ")
	} else if (content && !prose) {
		parsedContent = content.replaceAll('</p><br/>', " // ")
			.replace(/\u00A0/g, "")
			.replaceAll('</p><br>', " // ")
			.replaceAll('</p><br/>', " // ")
			.replaceAll('<br/><br/>', " // ")
			.replaceAll('<br><br>', " // ")
			.replaceAll('</p><p></p>', " // ")
			.replaceAll('</p>', " / ")
			.replaceAll('<br>', " / ")
			.replaceAll('<br/>', " / ")
			.replace(/\s\s+/, " ")
			.replace(/(<([^>]+)>)/gi, " ")
	}
	const firstHundred = parsedContent.slice(0, 150)
	const showContent = firstHundred.replace(/\s.\w+$/, "")

	const history = useHistory()
	const handlePaperClick = () => {
		history.push(`/texts/${id}`)
	}

	let isProse = "Poetry"
	if (prose) {
		isProse = "Prose"
	}

	const renderName = () => fam_name_first ? `${last_name} ${first_name}` : `${first_name} ${last_name}`
	const renderTranslator = () => {
		if (translator.length > 0) {
			return (
				<span style={{ color: "#757575", fontSize: "smaller" }}><em>Translated by {translator}</em></span>
			)
		} else {
			return ""
		}
	}
	// const displayName = () => <>{renderName()} {renderTranslator()}</>


	const displayDate = () => {
		return pubdate < 0 ? `${Math.abs(pubdate)} BCE` 
		: pubdate <1000 ? `${pubdate} CE`
		: pubdate
	}


	return (
		<Grid item >
			<Paper 
				elevation={6} 
				sx={{ p:3, m: 3, cursor: "pointer", backgroundColor: "#fffaf5" }}
				onClick={handlePaperClick}
			>
				<Typography variant="h5" sx={{ textAlign:"center" }}><b>{title}</b></Typography>
				<Typography variant="subtitle1" sx={{ textAlign:"center" }}>{renderName()}</Typography>
				{translator.length > 0 ?
					<Typography variant="subtitle1" sx={{ textAlign:"center", mt: -1 }}>{renderTranslator()}</Typography> 
				: null}
				<Typography variant="body2" sx={{ textAlign:"center", color: "#494949" }}>{displayDate()}<span style={{ marginLeft: "13px", marginRight: "13px"}}>❧</span>{isProse}</Typography>

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