import ComRepShow from "./ComRepShow";

export default function ReplyContainer({ comment, user, allUsers, onDeleteComment, forceRender, onEditComment }) {
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
				onDeleteComment={onDeleteComment} />
		</div>)
}