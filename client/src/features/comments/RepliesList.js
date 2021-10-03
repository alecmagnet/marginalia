import ComRepShow from "./ComRepShow";

export default function RepliesList({ replies, litTextId }) {

	const renderReplies = replies.map ((r) =>
	<div style={{ paddingLeft: 40, paddingBottom: 10 }} key={`${r.id}div`} >
		<ComRepShow 
			key={r.id} 
			comment={r} 
			litTextId={litTextId}
		/>
	</div>)	

	return(
		<div style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} >
				{renderReplies}
		</div>
	)
}