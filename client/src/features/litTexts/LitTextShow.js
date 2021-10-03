import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import CommentsList from '../comments/CommentsList'
// import CommentNewForm from '../comments/CommentNewForm.js'
import { fetchLitTextById } from './showTextSlice';

export default function LitTextShow() {
	const params = useParams()
  const dispatch = useDispatch()

	useEffect(() => dispatch(fetchLitTextById(params.id)), [])
	
	const litTextState = useSelector((state) => state.showText)
	const litText = litTextState.entities.length > 0 ? litTextState.entities[0] : null
	console.log("LitTextShow", litText)

	// const { entities:allUsers, status:userStatus } = useSelector((state) => state.allUsers)

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


	
	// function onAddComment(data) {
	// 	setListComments([data, ...listComments])
	// }

	// function onEditComment(data) {
	// 	let editComments = listComments.filter((c) => parseInt(c.id) !== parseInt(data.id))
	// 	let newArr = [data, ...editComments]
	// 	let toLogNewArr = newArr.filter((c) => parseInt(c.id) === parseInt(data.id))
	// 	console.log("LitText:newArr", toLogNewArr)
	// 	// setListComments(newArr)
	// 	setListComments((prevState) => {
	// 		let stateArr = prevState.filter((c) => parseInt(c.id) !== parseInt(data.id))
	// 		console.log("LitText:setListComments", data)
	// 		return [data, ...stateArr]
	// 	})
	// 	let toLogListComments = listComments.filter((c) => parseInt(c.id) === parseInt(data.id))
	// 	console.log("LitText:listComments", toLogListComments)
	// }

	// const onDeleteComment = (data) => {
	// 	let filteredComments = listComments.filter(com => com.id !== data)
	// 	setListComments(filteredComments)
	// }

	function replyButtonClick() {
		console.log("replyButtonClick should NOT have fired from LitTextShow")
	}


	if (litTextState.status === "idle" && litTextState.entities.length > 0) {
		return (
			<div style={{padding: 50}} >
				<h3>{litText.title}</h3>
				<h4>{litText.author}</h4>
				<div>{parsedContent}</div>
				<p><em>{litText.pubdate}</em></p>
				{/* <CommentNewForm 
					user={user} 
					lit_text_id={litText.id} 
					parent_comment_id={null} 
					onAddComment={onAddComment} 
					replyButtonClick={replyButtonClick}
				/> */}
				<CommentsList 
					comments={listComments} 
					// lit_text_id={litText.id} 
					// onEditComment={onEditComment}
					// user={user} 
					// allUsers={allUsers} 
					// onAddComment={onAddComment} 
					// onDeleteComment={onDeleteComment} 
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