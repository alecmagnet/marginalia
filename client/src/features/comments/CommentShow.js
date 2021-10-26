import { useSelector } from "react-redux"
import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"
import { Grid, Paper } from '@mui/material'

export default function CommentShow({ comment, replies, litTextId }) {
	const unDeletedArr = [comment, ...replies].filter(com => com.deleted === false)
	// console.log("unDeletedArr", unDeletedArr)

	const commentState = useSelector((state) => state.comments)
	const undeletedChildren = () => [...commentState.entities].filter(com => com.parent_comment_id === comment.id && com.deleted === false)

	return (
		<>
		{unDeletedArr.length > 0 || undeletedChildren().length > 0 ?
		<Grid 
			item xs={10} sx={{ maxWidth: 800, minWidth: 500 }}
		>
      <Paper sx={{ px:3, pt:4, pb:1, mb:2, backgroundColor: "#fefcf9" }} elevation={3}>			
			<ComRepShow 
				key={comment.id} 
				comment={comment}
				litTextId={litTextId}
			/>
			{replies.length > 0 ? 
				<>
				<RepliesList 
					replies={replies} 
					litTextId={litTextId}
				/> 
				</>
			: null}	
			</Paper>	
		</Grid>
		: null}
		</>
	)
}