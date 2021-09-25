import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Fragment } from "react"
import CommentsList from './CommentsList'

function LitTextShow({ litTexts, user, allUsers }) {
	const params = useParams()
	const litText = litTexts.filter((text) => parseInt(text.id) === parseInt(params.id))[0]
	const parsedContent = litText ? parse(`${litText.content}`) : ""

	return (
		<Fragment>
			{litText ? 
				<div style={{padding: 50}} >
					<h3>{litText.title}</h3>
					<h4>{litText.author}</h4>
					<div>{parsedContent}</div>
					<CommentsList comments={litText.comments} user={user} allUsers={allUsers} /> 
					<h3>Replies</h3>
				</div>
			: <h3>We're sorry, there is no such text</h3>}
		</Fragment>

	)
}

export default LitTextShow