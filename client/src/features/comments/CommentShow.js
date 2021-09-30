import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"

export default function CommentShow({ comment, allUsers, user, replies, onDeleteComment, changeDummyState, forceRender, onEditComment, onAddComment, lit_text_id }) {
	
	const commentUser = allUsers.find((u) => parseInt(u.id) === parseInt(comment.user_id))

	return (
		<div style={{ padding: 10 }} >
			<ComRepShow 
				onEditComment={onEditComment}
				forceRender={forceRender}
				changeDummyState={changeDummyState} 
				key={comment.id} 
				comment={comment} 
				commentUser={commentUser} 
				allUsers={allUsers} 
				user={user} 
				onDeleteComment={onDeleteComment} 
				onAddComment={onAddComment}
				lit_text_id={lit_text_id}	
			/>
			{replies.length > 0 ? 
				<RepliesList 
					onEditComment={onEditComment}
					forceRender={forceRender}
					replies={replies} 
					user={user} 
					allUsers={allUsers} 
					commentUser={commentUser} 
					onDeleteComment={onDeleteComment} 
					onAddComment={onAddComment}	
					lit_text_id={lit_text_id}
				/> 
			: null}		
		</div>
	)
}