import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, replies, litTextId }) {
	
	// const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return (
		<div style={{ padding: 10 }} >
			<ComRepShow 
				key={comment.id} 
				comment={comment}
				litTextId={litTextId}
			/>
			{replies.length > 0 ? 
				// <p>Replies coming soon</p>
				<RepliesList 
					replies={replies} 
					litTextId={litTextId}
					// onEditComment={onEditComment}
					// onDeleteComment={onDeleteComment} 
					// onAddComment={onAddComment}	
				/> 
			: null}		
		</div>
	)
}