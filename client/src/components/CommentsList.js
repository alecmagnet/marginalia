import CommentShow from "./CommentShow"

export default function CommentsList({ comments, user, allUsers, onDeleteComment, changeDummyState }) {
	const parentComments = comments.filter((c) => c.parent_comment_id === null)
	
	// const replies = comments.filter((c) => c.parent_comment_id !== null)
	
	const renderComments = parentComments.map((c) => {
		let replies = comments.filter((r) => r.parent_comment_id === c.id)
		return(
			<CommentShow key={c.id} comment={c} user={user} allUsers={allUsers} replies={replies} onDeleteComment={onDeleteComment} changeDummyState={changeDummyState} />
		)	
	})

	return (
		<div>
			{renderComments}
		</div>
	)
}