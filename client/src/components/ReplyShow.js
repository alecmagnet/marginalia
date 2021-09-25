

export default function ReplyShow({ reply, user, allUsers }) {

	const replyUser = allUsers.find((u) => parseInt(u.id) === parseInt(reply.user_id))

	return(
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<h4>{replyUser.username}</h4>
						
			</div>
		</div>
	)
}