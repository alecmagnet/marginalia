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
				<RepliesList 
					// key={`${comment.id}r`}
					replies={replies} 
					litTextId={litTextId}
				/> 
			: null}		
		</div>
	)
}