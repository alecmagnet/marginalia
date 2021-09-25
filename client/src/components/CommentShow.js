import TimeAgoContainer from "./TimeAgoContainer"


export default function CommentShow({ comment, allUsers, user }) {

	const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))
	console.log("CommentShow user", commentUser)
	return (
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<h4>{commentUser.username}</h4>
				<p>{comment.content}</p>	
				<TimeAgoContainer created_at={comment.created_at} updated_at={comment.updated_at} />
			</div>			
		</div>
	)
}