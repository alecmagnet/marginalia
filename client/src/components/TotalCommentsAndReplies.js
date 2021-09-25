
export default function TotalCommentsAndReplies({ arr }) {

	const totalComments = arr.filter((c) => c.parent_comment_id === null).length
	const showTotalComments = totalComments === 1 ? `${totalComments} comment` : `${totalComments} comments`

	const totalReplies = arr.filter((c) => c.parent_comment_id !== null).length
	const showTotalReplies = totalReplies === 1 ? `${totalReplies} reply` : `${totalReplies} replies`  

	return (
		<p>{showTotalComments}, {showTotalReplies}</p>
	)
}