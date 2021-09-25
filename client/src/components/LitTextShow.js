import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Fragment, useState } from "react"
import CommentsList from './CommentsList'
import CommentNewForm from './CommentNewForm.js'

function LitTextShow({ litTexts, user, allUsers }) {
	const params = useParams()
	const litText = litTexts.filter((text) => parseInt(text.id) === parseInt(params.id))[0]
	const [listComments, setListComments] = useState(litText.comments)
	const parsedContent = litText ? parse(`${litText.content}`) : ""


	function onAddComment(data) {
		// appOnAddComment(data)
		setListComments([data, ...listComments])
	}

	const onDeleteComment = (data) => {
		let filteredComments = listComments.filter(com => com.id !== data)
		setListComments(filteredComments)
		// appOnDeleteComment(data)
	}


	return (
		<Fragment>
			{litText ? 
				<div style={{padding: 50}} >
					<h3>{litText.title}</h3>
					<h4>{litText.author}</h4>
					<div>{parsedContent}</div>
					<p><em>{litText.pubdate}</em></p>
					<CommentNewForm user={user} lit_text_id={litText.id} parent_comment_id={null} onAddComment={onAddComment} />
					<CommentsList comments={listComments} user={user} allUsers={allUsers} onDeleteComment={onDeleteComment} /> 
				</div>
			: <h3>We're sorry, there is no such text</h3>}
		</Fragment>

	)
}

export default LitTextShow