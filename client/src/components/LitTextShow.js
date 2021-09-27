import parse from 'html-react-parser'
import { useParams, Link } from 'react-router-dom'
// import { Fragment, useState } from "react"
import { Fragment, useState, useRef } from "react"
// import { Fragment, useState, useEffect } from "react"
import CommentsList from './CommentsList'
import CommentNewForm from './CommentNewForm.js'

function LitTextShow({ litTexts, user, allUsers, forceRender }) {
	const params = useParams()
	const litText = litTexts.filter((text) => parseInt(text.id) === parseInt(params.id))[0]
	const newestFirst = litText.comments.sort((a, b) => b.id - a.id)
	const [listComments, setListComments] = useState(newestFirst)
	const parsedContent = litText ? parse(`${litText.content}`) : ""

	// useEffect(() => {
	// 	setListComments(litText.comments)
	// }, [litText])

	const ref = useRef(listComments)

	const [dummyState, setDummyState] = useState(false)
	function changeDummyState(){
		setDummyState(!dummyState)
	}

	function onAddComment(data) {
		setListComments([data, ...listComments])
	}

	function onEditComment(data) {
		let editComments = listComments.filter((c) => parseInt(c.id) !== parseInt(data.id))
		let newArr = [data, ...editComments]
		ref.current = newArr
		let toLogNewArr = newArr.filter((c) => parseInt(c.id) === parseInt(data.id))
		console.log("LitText:newArr", toLogNewArr)
		// setListComments(newArr)
		setListComments((prevState) => {
			let stateArr = prevState.filter((c) => parseInt(c.id) !== parseInt(data.id))
			console.log("LitText:setListComments", data)
			return [data, ...stateArr]
		})
		let toLogListComments = listComments.filter((c) => parseInt(c.id) === parseInt(data.id))
		console.log("LitText:listComments", toLogListComments)
	}

	const onDeleteComment = (data) => {
		let filteredComments = listComments.filter(com => com.id !== data)
		setListComments(filteredComments)
	}


	if (allUsers.length > 0) {
		return (
			<Fragment>
				{litText ? 
					<div style={{padding: 50}} >
						<h3>{litText.title}</h3>
						<h4>{litText.author}</h4>
						<div>{parsedContent}</div>
						<p><em>{litText.pubdate}</em></p>
						<CommentNewForm 
							user={user} 
							lit_text_id={litText.id} 
							parent_comment_id={null} 
							onAddComment={onAddComment} />
						<CommentsList comments={listComments} 
							onEditComment={onEditComment}
							forceRender={forceRender}
							changeDummyState={changeDummyState}
							user={user} 
							allUsers={allUsers} 
							onDeleteComment={onDeleteComment} /> 
					</div>
				: <h3>We're sorry, there is no such text. <Link to='/texts'>Go Back</Link></h3>}
			</Fragment>
		)
	} else {
		return (
			<h1>Loading...</h1>
		)
	}
}

export default LitTextShow