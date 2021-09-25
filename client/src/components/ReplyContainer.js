import ComRepShow from "./ComRepShow";

export default function ReplyContainer({ comment, user, allUsers }) {

	return(
		<div style={{ paddingLeft: 40, paddingBottom: 10 }} >
			<ComRepShow key={comment.id} comment={comment} user={user} allUsers={allUsers} />
		</div>)
}