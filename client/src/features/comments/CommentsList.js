import CommentShow from "./CommentShow"

export default function CommentsList({ comments, user, allUsers, onDeleteComment, changeDummyState, forceRender, onEditComment, onAddComment, lit_text_id }) {
	const parentComments = comments.filter((c) => c.parent_comment_id === null)
	
	// const replies = comments.filter((c) => c.parent_comment_id !== null)
	
	const renderComments = parentComments.map((c) => {
		let replies = comments.filter((r) => r.parent_comment_id === c.id)
		return(
			<CommentShow 
				onEditComment={onEditComment}
				forceRender={forceRender}
				changeDummyState={changeDummyState} 
				key={c.id} 
				comment={c} 
				user={user} 
				allUsers={allUsers} 
				replies={replies} 
				onDeleteComment={onDeleteComment} 
				onAddComment={onAddComment}	
				lit_text_id={lit_text_id}
			/>
		)	
	})

	return (
		<div>
			{renderComments}
		</div>
	)
}