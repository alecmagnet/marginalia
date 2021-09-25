import ReplyContainer from "./ReplyContainer"

export default function RepliesList({ replies, user, allUsers, commentUser, onDeleteComment }) {

	const renderReplies = replies.map ((r) =>
	<ReplyContainer key={r.id} comment={r} user={user} allUsers={allUsers} commentUser={commentUser} onDeleteComment={onDeleteComment} />)	

	return(
		<div style={{ padding: 10 }} >
				{renderReplies}
		</div>
	)
}