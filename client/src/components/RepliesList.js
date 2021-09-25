import ReplyContainer from "./ReplyContainer"

export default function RepliesList({ replies, user, allUsers }) {

	const renderReplies = replies.map ((r) =>
	<ReplyContainer key={r.id} comment={r} user={user} allUsers={allUsers} />)	

	return(
		<div style={{ padding: 10 }} >
				{renderReplies}
		</div>
	)
}