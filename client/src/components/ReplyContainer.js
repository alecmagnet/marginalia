import ComRepShow from "./ComRepShow";

export default function ReplyContainer({ comment, user, allUsers, onDeleteComment }) {
	const replyUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return(
		<div style={{ paddingLeft: 40, paddingBottom: 10 }} >
			<ComRepShow key={comment.id} comment={comment} user={user} allUsers={allUsers} commentUser={replyUser} onDeleteComment={onDeleteComment} />
		</div>)
}