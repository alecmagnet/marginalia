import ComRepShow from "./ComRepShow";
import { Divider } from "@mui/material";

export default function RepliesList({ replies, litTextId }) {
	const oldestFirst = replies.sort((a, b) => a.id - b.id)

	const renderReplies = oldestFirst.map ((r) =>
	<div style={{ paddingLeft: 40, paddingBottom: 10 }} key={`${r.id}div`} >
		<Divider variant="fullWidth" style={{ margin: "0 0 30px 0" }} />
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