import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, Typography } from '@mui/material'
import CommentsList from '../comments/CommentsList'
import { fetchLitTextById } from './showTextSlice';

export default function LitTextShow() {
	const params = useParams()
  const dispatch = useDispatch()

	useEffect(() => dispatch(fetchLitTextById(params.id)), [])
	
	const litTextState = useSelector((state) => state.showText)
	const litText = litTextState.entities.length > 0 ? litTextState.entities[0] : null

  // const userState = useSelector((state) => state.user)
  // const user = userState.entities.length > 0 ? userState.entities[0] : null

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
				item xs={9}
			>
				<Paper 
					elevation={9} 
					sx={{ p:3, m: 3, backgroundColor: "#fffaf5" }}
				>
					<Typography variant="h5" sx={{ textAlign:"center" }}><b>{litText.title}</b></Typography>
					{/* <h3>{title}</h3> */}
					<Typography variant="subtitle1" sx={{ textAlign:"center" }}>{litText.author}</Typography>
					<Typography variant="body2" sx={{ textAlign:"center" }}><em>{litText.pubdate}</em></Typography>
					<Typography variant="body1" sx={{ p:3, display:"flex", justifyContent:"center" }}>
						<div style={{ margin:"0 auto" }}>
						{parsedContent}</div>
						</Typography>

				</Paper>
			</Grid>
			<div style={{padding: 50}} >
				{/* <h3>{litText.title}</h3>
				<h4>{litText.author}</h4>
				<div>{parsedContent}</div>
				<p><em>{litText.pubdate}</em></p> */}
				{/* <a id="comments"> */}
					<CommentsList 
						litTextId={litText.id} 
					/>
				{/* </a>  */}
			</div>
		</Grid>
		)
	// } else if ((litTextState.entities.length === 0 && litTextState.status === "idle") ||litTextState.entities[0].errors) {
	// 	return (
	// 		<div className="centered-in-window" >
	// 			<h1>We're sorry. There's been an error</h1>
	// 		</div>
	// 	)
	} else {
		return (
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	}
}

	// if (litTextState.status === "idle" && litTextState.entities.length > 0) {
	// 	return (
	// 		<div style={{padding: 50}} >
	// 			<h3>{litText.title}</h3>
	// 			<h4>{litText.author}</h4>
	// 			<div>{parsedContent}</div>
	// 			<p><em>{litText.pubdate}</em></p>
	// 			{/* <a id="comments"> */}
	// 				<CommentsList 
	// 					litTextId={litText.id} 
	// 				/>
	// 			{/* </a>  */}
	// 		</div>
	// 	)