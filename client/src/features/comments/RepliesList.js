import ReplyContainer from "./ReplyContainer"

export default function RepliesList({ replies, user, allUsers, onDeleteComment, forceRender, onEditComment, onAddComment, lit_text_id }) {

	const renderReplies = replies.map ((r) =>
	<ReplyContainer 
		onEditComment={onEditComment}
		forceRender={forceRender}
		key={r.id} 
		comment={r} 
		user={user} 
		allUsers={allUsers} 
		onDeleteComment={onDeleteComment} 
		onAddComment={onAddComment}	
		lit_text_id={lit_text_id}
	/>)	

	return(
		<div style={{ padding: 10 }} >
				{renderReplies}
		</div>
	)
}