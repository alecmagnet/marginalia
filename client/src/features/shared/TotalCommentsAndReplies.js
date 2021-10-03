import { useSelector } from "react-redux"

export default function TotalCommentsAndReplies({ showUserId }) {

	const stateComments = useSelector((state) => state.comments)
	const allComments = [...stateComments.entities]
	const showUserComments = allComments.filter((c) => c.user_id === showUserId)

	const totalComments = showUserComments.filter((c) => c.parent_comment_id === null).length
	const showTotalComments = totalComments === 1 ? `${totalComments} comment` : `${totalComments} comments`

	const totalReplies = showUserComments.filter((c) => c.parent_comment_id !== null).length
	const showTotalReplies = totalReplies === 1 ? `${totalReplies} reply` : `${totalReplies} replies`  

	return (
		<p>{showTotalComments}, {showTotalReplies}</p>
	)
}