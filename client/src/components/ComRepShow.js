import TimeAgoContainer from "./TimeAgoContainer"

export default function ComRepShow({ comment, allUsers, user, commentUser }) {
	// const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return (
		<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
			<h4>{commentUser.username}</h4>
			<p>{comment.content}</p>	
			<TimeAgoContainer created_at={comment.created_at} updated_at={comment.updated_at} />
			{parseInt(commentUser.id) === parseInt(user.id) ? 
			<p style={{ color: "purple" }} ><em>**Add edit and delete buttons here**</em></p> 
			: null}
		</div>	
	)
}