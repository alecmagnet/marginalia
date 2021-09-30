import ComRepShow from "./ComRepShow";

export default function ReplyContainer({ comment, user, allUsers, onDeleteComment, forceRender, onEditComment, onAddComment, lit_text_id }) {
	const replyUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return(
		<div style={{ paddingLeft: 40, paddingBottom: 10 }} >
			<ComRepShow 
				onEditComment={onEditComment}
				forceRender={forceRender}
				key={comment.id} 
				comment={comment} 
				user={user} 
				allUsers={allUsers} 
				commentUser={replyUser} 
				onDeleteComment={onDeleteComment} 
				onAddComment={onAddComment}	
				lit_text_id={lit_text_id}
			/>
		</div>)
}