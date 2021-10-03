import { useParams } from 'react-router-dom'
import CommentShow from "./CommentShow"

export default function CommentsList({ comments }) {
	const params = useParams()
	const litTextId = params.id 
	console.log(litTextId)

	const parentComments = comments.filter((c) => c.parent_comment_id === null)
	
	// const replies = comments.filter((c) => c.parent_comment_id !== null)
	
	const renderComments = parentComments.map((c) => {
		let replies = comments.filter((r) => r.parent_comment_id === c.id)
		return(
			<CommentShow 
				key={c.id} 
				comment={c} 
				// lit_text_id={lit_text_id}
				// onEditComment={onEditComment}
				// user={user} 
				// allUsers={allUsers} 
				replies={replies} 
				// onDeleteComment={onDeleteComment} 
				// onAddComment={onAddComment}	
			/>
		)	
	})

	return (
		<div>
			{/* <p>Comments comming soon</p> */}
			{renderComments}
		</div>
	)
}