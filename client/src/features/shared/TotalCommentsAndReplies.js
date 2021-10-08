import { useSelector } from "react-redux"
import { Typography } from "@mui/material"

export default function TotalCommentsAndReplies({ Id, source }) {

	const stateComments = useSelector((state) => state.comments)
	const allComments = [...stateComments.entities]
	const undeletedComments = allComments.filter((c) => c.deleted === false)
	
	let filteredComments = []
	if (source === "user") filteredComments = undeletedComments.filter((c) => c.user_id === Id)
	if (source === "litText") filteredComments = undeletedComments.filter((c) => c.lit_text_id === Id)

	// const showUserComments = allComments.filter((c) => c.user_id === Id)

	const totalComments = filteredComments.filter((c) => c.parent_comment_id === null).length
	const showTotalComments = totalComments === 1 ? `${totalComments} comment` : `${totalComments} comments`

	const totalReplies = filteredComments.filter((c) => c.parent_comment_id !== null).length
	const showTotalReplies = totalReplies === 1 ? `${totalReplies} reply` : `${totalReplies} replies`  

	return (
		<Typography variant="caption"><em>{showTotalComments}, {showTotalReplies}</em></Typography>
	)
}