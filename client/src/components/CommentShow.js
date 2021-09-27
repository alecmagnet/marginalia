import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, allUsers, user, replies, onDeleteComment, changeDummyState }) {
	const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return (
		<div style={{ padding: 10 }} >
			<ComRepShow key={comment.id} comment={comment} commentUser={commentUser} allUsers={allUsers} user={user} onDeleteComment={onDeleteComment} changeDummyState={changeDummyState} />
			{replies.length > 0 ? <RepliesList replies={replies} user={user} allUsers={allUsers} commentUser={commentUser} onDeleteComment={onDeleteComment} /> : null}		
		</div>
	)
}