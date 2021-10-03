// import ReplyContainer from "./ReplyContainer"
import ComRepShow from "./ComRepShow";

export default function RepliesList({ replies }) {

	const renderReplies = replies.map ((r) =>
	<div style={{ paddingLeft: 40, paddingBottom: 10 }} >
		<ComRepShow 
			key={r.id} 
			comment={r} 
			// onEditComment={onEditComment}
			// onDeleteComment={onDeleteComment} 
			// onAddComment={onAddComment}	
		/>
	</div>)	

	return(
		<div style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} >
				{renderReplies}
		</div>
	)
}