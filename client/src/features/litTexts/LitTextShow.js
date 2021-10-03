import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import CommentsList from '../comments/CommentsList'
import { fetchLitTextById } from './showTextSlice';

export default function LitTextShow() {
	const params = useParams()
  const dispatch = useDispatch()

	useEffect(() => dispatch(fetchLitTextById(params.id)), [])
	
	const litTextState = useSelector((state) => state.showText)
	const litText = litTextState.entities.length > 0 ? litTextState.entities[0] : null
	console.log("LitTextShow", litText)

  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

	let listComments = []
	let parsedContent = ""
	if (litTextState.entities.length > 0) {
		parsedContent = parse(`${litText.content}`)
		const sortComments = [...litText.comments]
		const newestFirst = sortComments.sort((a, b) => b.id - a.id)
		listComments = [...newestFirst]
	}


	if (litTextState.status === "idle" && litTextState.entities.length > 0) {
		return (
			<div style={{padding: 50}} >
				<h3>{litText.title}</h3>
				<h4>{litText.author}</h4>
				<div>{parsedContent}</div>
				<p><em>{litText.pubdate}</em></p>
				<CommentsList 
					litTextId={litText.id} 
				/> 
			</div>
		)
	} else if (litTextState.status === "pending") {
		return (
			<h1>Loading...</h1>
		)
	} else {
		return (
			<h1>We're sorry. There's been an error</h1>
		)
	}
}