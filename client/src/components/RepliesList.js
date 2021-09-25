import ReplyContainer from "./ReplyContainer"

export default function RepliesList({ replies, user, allUsers, commentUser }) {

	const renderReplies = replies.map ((r) =>
	<ReplyContainer key={r.id} comment={r} user={user} allUsers={allUsers} commentUser={commentUser} />)	

	return(
		<div style={{ padding: 10 }} >
				{renderReplies}
		</div>
	)
}