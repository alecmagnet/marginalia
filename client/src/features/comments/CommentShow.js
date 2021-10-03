import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, replies }) {
	
	// const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return (
		<div style={{ padding: 10 }} >
			<ComRepShow 
				key={comment.id} 
				comment={comment} 
			/>
			{replies.length > 0 ? 
				<p>Replies coming soon</p>
				// <RepliesList 
				// 	// onEditComment={onEditComment}
				// 	// forceRender={forceRender}
				// 	replies={replies} 
				// 	user={user} 
				// 	allUsers={allUsers} 
				// 	commentUser={commentUser} 
				// 	onDeleteComment={onDeleteComment} 
				// 	onAddComment={onAddComment}	
				// 	lit_text_id={lit_text_id}
				// /> 
			: null}		
		</div>
	)
}