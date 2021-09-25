import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, allUsers, user, replies, onDeleteComment }) {
	const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))
	// const filteredReplies = replies.filter((r) => parseInt(r.user_id) === parseInt(commentUser.id))

	return (
		<div style={{ padding: 10 }} >
			<ComRepShow key={comment.id} comment={comment} commentUser={commentUser} allUsers={allUsers} user={user} onDeleteComment={onDeleteComment} />
			{replies.length > 0 ? <RepliesList replies={replies} user={user} allUsers={allUsers} commentUser={commentUser} onDeleteComment={onDeleteComment} /> : null}		
		</div>
	)
}