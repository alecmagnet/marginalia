import { useSelector } from "react-redux"
import CommentNewForm from '../comments/CommentNewForm.js'
import CommentShow from "./CommentShow"

export default function CommentsList({ litTextId }) {
	
	const stateComments = useSelector((state) => state.comments)
	const allComments = [...stateComments.entities]
	const showTextComments = allComments.filter((c) => c.lit_text_id === litTextId)

	const parentComments = showTextComments.filter((c) => c.parent_comment_id === null)
	const oldestFirst = parentComments.sort((a, b) => a.id - b.id)

	const renderComments = oldestFirst.map((c) => {
		let replies = showTextComments.filter((r) => r.parent_comment_id === c.id)
		return(
			<CommentShow 
				key={c.id} 
				comment={c} 
				litTextId={litTextId} 
				replies={replies} 
			/>
		)	
	})

	return (
		<div>
			{renderComments}
			<CommentNewForm 
				litTextId={litTextId}
				parentCommentId={null}
				replyButtonClick={null}
			/>
		</div>
	)
}