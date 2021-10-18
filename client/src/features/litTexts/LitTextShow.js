import parse from 'html-react-parser'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, Typography, Tooltip, Box } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import ForumIcon from '@mui/icons-material/Forum';
import CommentsList from '../comments/CommentsList'
import { fetchLitTextById } from './showTextSlice'
import { HashLink } from 'react-router-hash-link'

export default function LitTextShow() {
	const params = useParams()
  const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()
	
	useEffect(() => {
		if (location.hash.length > 0) history.push(location.pathname)
		dispatch(fetchLitTextById(params.id))
	}, [])
	
	const litTextState = useSelector((state) => state.showText)
	const litText = litTextState.entities.length > 0 ? litTextState.entities[0] : null
	
	let commentsHash = ""
	let newCommentHash = ""
	if (litTextState.entities.length > 0) commentsHash = `/texts/${litText.id}#comments`
	if (litTextState.entities.length > 0) newCommentHash = `/texts/${litText.id}#new-comment`

	// let listComments = []
	let parsedContent = ""
	let isProse = "Poetry"
	if (litTextState.entities.length > 0) {
		parsedContent = parse(`${litText.content}`)
		if (litText.prose) {
			isProse = "Prose"
		}
		// const sortComments = [...litText.comments]
		// const newestFirst = sortComments.sort((a, b) => b.id - a.id)
		// listComments = [...newestFirst]
	}

	const displayDate = () => {
		const value = litText.pubdate
		return value < 0 ? `${Math.abs(value)} BCE` 
		: value <1000 ? `${value} CE`
		: value
	}


	if (litTextState.status === "idle" && litTextState.entities.length > 0) {
		return (
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={9} sx={{ maxWidth: 850 }}
			>
				<div style={{ 
					display:"flex", 
					justifyContent:"center", 
					alignContent: "center", 
					marginTop: 12, 
					paddingBottom: 2 
				}}>
					<Tooltip title="Comments" arrow>
						<HashLink smooth to={commentsHash} style={{ marginRight: 18, color: "#757575" }}>
								<ForumIcon size="small" sx={{mt: 3 }} />
							</HashLink>
					</Tooltip>
					<Tooltip title="New Comment" arrow>
						<HashLink smooth to={newCommentHash} style={{ color: "#757575" }}>
							<AddCommentIcon size="small" sx={{mt: 3 }} />
						</HashLink>
					</Tooltip>
				</div>
				<Paper 
					elevation={9} 
					sx={{ p:3, m: 3, mt: 1, backgroundColor: "#fffaf5", justifyContent:"center", }}
				>
					{/* <div style={{ display:"flex", justifyContent:"center", alignContent: "center", marginTop: 6, marginBottom: 14, paddingBottom: 2 }}> */}
						<Typography variant="subtitle1" sx={{ textAlign:"center", color:"#616161", pb: 0, cursor: "default" }}><em>{isProse}</em></Typography>
					{/* </div> */}
					<Grid container wrap="nowrap">
						<Grid item xs={12}>
					<Typography variant="h4" sx={{ textAlign:"center", mt: 1 }}><b>{litText.title}</b></Typography>
					<Typography variant="h6" sx={{ textAlign:"center" }}>{litText.author}</Typography>
					<Typography variant="subtitle1" sx={{ textAlign:"center" }}><em>{displayDate()}</em></Typography>
						<Grid container wrap="nowrap">
							<Grid item xs={12} justifyContent="center" sx={{ display: "flex", }}>
								<div style={{ position: "flex", }} >
									<Typography variant="body1" sx={{ pb:3, pr:3, pl:3, pt:2, }}>
									{litText.prose ?	
										<div>
											{parsedContent}
										</div>
									:
										<div className="poetry">
											{parsedContent}
										</div>
									}
									</Typography>
									</div>
							</Grid>
						</Grid>
					</Grid>
					</Grid>
				</Paper>
			</Grid>
			<div style={{padding: 10, marginLeft: "24%", marginRight: "24%", maxWidth: 760}} id="comments" >
					<CommentsList 
						litTextId={litText.id} 
					/>
			</div>
		</Grid>
		)
	} else {
		return (
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	}
}