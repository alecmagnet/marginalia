import ComRepShow from "./ComRepShow"

export default function RepliesList({ replies, user, allUsers }) {

	const renderReplies = replies.map ((r) => {
		return(<div style={{ paddingLeft: 40, paddingBottom: 10 }} ><ComRepShow key={r.id} comment={r} user={user} allUsers={allUsers} /></div>)})	

	return(
		<div style={{ padding: 10 }} >
				{renderReplies}
		</div>
	)
}