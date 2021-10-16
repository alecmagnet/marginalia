import parse from 'html-react-parser'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, Typography, Tooltip } from '@mui/material'
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

	let parsedContent = ""
	
	// let listComments = []
	if (litTextState.entities.length > 0) {
		parsedContent = parse(`${litText.content}`)
		// const sortComments = [...litText.comments]
		// const newestFirst = sortComments.sort((a, b) => b.id - a.id)
		// listComments = [...newestFirst]
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
				<Paper 
					elevation={9} 
					sx={{ p:3, m: 3, backgroundColor: "#fffaf5" }}
				>
					<div style={{ display:"flex", justifyContent:"center", marginTop: 6, marginBottom: 9, paddingBottom: 2 }}>
            <Tooltip title="Comments" arrow>
							<HashLink smooth to={commentsHash} style={{ marginRight: 12, color: "#757575" }}>
									<ForumIcon size="small" />
								</HashLink>
						</Tooltip>
            <Tooltip title="New Comment" arrow>
							<HashLink smooth to={newCommentHash} style={{ color: "#757575" }}>
								<AddCommentIcon size="small" />
							</HashLink>
						</Tooltip>
					</div>
					<Grid container wrap="nowrap">
						<Grid item xs={12}>
					<Typography variant="h4" sx={{ textAlign:"center" }}><b>{litText.title}</b></Typography>
					<Typography variant="h6" sx={{ textAlign:"center" }}>{litText.author}</Typography>
					<Typography variant="subtitle1" sx={{ textAlign:"center" }}><em>{litText.pubdate}</em></Typography>
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
					<div style={{ display:"flex", justifyContent:"center", marginTop: 6, marginBottom: 9, paddingBottom: 2 }}>
            <Tooltip title="New Comment" arrow>
							<HashLink smooth to={newCommentHash} style={{ color: "#757575" }}>
								<AddCommentIcon size="small" />
							</HashLink>
						</Tooltip>
					</div>
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