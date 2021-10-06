import ComRepShow from "./ComRepShow"
import RepliesList from "./RepliesList"
import { Grid, Paper } from '@mui/material'



export default function CommentShow({ comment, replies, litTextId }) {
	

	return (
		<Grid 
			item xs={7} sx={{ maxWidth: 700, minWidth: 500 }}
		>
      <Paper sx={{ pr:3, pl:3, pt:4, pb:1, mb:2 }}>			
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
	)
}