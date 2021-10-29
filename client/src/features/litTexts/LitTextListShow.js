import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'
import { Typography, Grid, Paper, Card, Box } from '@mui/material'

export default function LitTextListShow({ litText }) {
	const { title, author_name, pubdate, content, id, prose, translator } = litText
	const userState = useSelector((state) => state.user)
	const location = useLocation()
	// console.log("from LitTextListShow: litText:", litText, "translator", translator)
  
	let parsedContent = ""
	if (content && prose) {
		parsedContent = content.replace(/(<([^>]+)>)/gi, " ")
	} else if (content && !prose) {
		parsedContent = content
			.replace(/\u00A0/g, "")
			.replace(/(<\/p><br\/*>)|(<br\/*><br\/*>)|(<\/p><p><\/p>)/g, " // ")
			.replace(/(<\/p>)|(<br\/*>)/g, " / ")
			.replace(/(<([^>]+)>)/gi, " ")
	}
	const firstHundred = parsedContent.slice(0, 130)
	const showContent = firstHundred.replace(/(\s\S+$)|(\W+\s\S+$)|(\W+$)/, "")

	const history = useHistory()
	const handlePaperClick = () => {
		userState.entities.length === 0 ?
    history.push('/login') :
		history.push(`/texts/${id}`)
	}

	let isProse = "Poetry"
	if (prose) {
		isProse = "Prose"
	}

	const renderTranslator = () => {
		if (translator.length > 0) {
			return (
				<span style={{ color: "#757575", fontSize: "smaller" }}><em>Translated by {translator}</em></span>
			)
		} else {
			return ""
		}
	}


	const displayDate = () => {
		return pubdate < 0 ? `${Math.abs(pubdate)} BCE` 
		: pubdate <1000 ? `${pubdate} CE`
		: pubdate
	}


	const elevationProp = () => location.pathname.includes("texts") ? 6 : 2


	return (
		<Grid container item xs={12} justifyContent="center">
			<Grid container item xs={12} md={11}>
			<Paper 
				elevation={elevationProp()} 
				mx={{ md: 3 }}
				sx={{ p:3, mt: 2, cursor: "pointer", }}
				onClick={handlePaperClick}
			>
				<Typography variant="h5" sx={{ textAlign:"center" }}><b>{title}</b></Typography>
				<Typography variant="subtitle1" sx={{ textAlign:"center" }}>{author_name}</Typography>
				{translator.length > 0 ?
					<Typography variant="subtitle1" sx={{ textAlign:"center", mt: -1 }}>{renderTranslator()}</Typography> 
				: null}
				<Typography variant="body2" sx={{ textAlign:"center", color: "#494949" }}>{displayDate()}<span style={{ marginLeft: "13px", marginRight: "13px"}}>❧</span>{isProse}</Typography>

				<Grid container item
					xs={12}
					justifyContent="center"
				>
					<Grid item xs={12} md={11}>
						<Card
							variant="outlined" 
							sx={{ p:2, pt: 0, my:1, }}
						>
							<Typography 
								sx={{ fontSize: 14, textAlign:"center", mt:1 }} 
								color="text.secondary" 
								gutterBottom
							>
								<em>Preview</em>
							</Typography>				
							<Typography variant="body1">
								{showContent}&nbsp;.&nbsp;.&nbsp;.
							</Typography> 
						</Card>
					</Grid>
				</Grid>
				<Box component="div" justifyContent="center" sx={{ display:"flex", width: "100%", }}>
					<TotalCommentsAndReplies Id={litText.id} source="litText" />				
				</Box>
			</Paper>
			</Grid>
		</Grid>
	)
}