import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, allUsers, user, replies }) {

	return (
		<div style={{ padding: 10 }} >
			{/* <div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<h4>{commentUser.username}</h4>
				<p>{comment.content}</p>	
				<TimeAgoContainer created_at={comment.created_at} updated_at={comment.updated_at} />
				{parseInt(commentUser.id) === parseInt(user.id) ? 
				<p style={{ color: "purple" }} ><em>**Add edit and delete buttons here**</em></p> 
				: null}
			</div>	 */}
			<ComRepShow key={comment.id} comment={comment} allUsers={allUsers} user={user} />
			{replies.length > 0 ? <RepliesList replies={replies} user={user} allUsers={allUsers} /> : null}		
		</div>
	)
}