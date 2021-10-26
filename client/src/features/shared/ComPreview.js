import { Typography, Grid, Box, Avatar, Paper } from '@mui/material'


export default function ComPreview({ comments, isFromHome }) {
	return comments.sort(
		(a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
	).map(com => {
		const comLitText = { 
			"title": com.lit_text_title,
			"author_name": com.lit_text_author,
			"pubdate": com.lit_text_date,
			"content": com.lit_text_preview, 
			"id": com.lit_text_id, 
			"prose": com.lit_text_prose, 
			"translator": com.lit_text_translator 
		}
		return (
			<Grid container item xs={10}>
				<Paper
					sx={{ width: "100%", p: 2, my: 1, pt: 4 }}
					elevation={2}
				>
					<Grid container item xs={12}>
				{/* ADD COMTYPES */}
				{isFromHome ? 
					<Grid item xs="auto">
						<Avatar 
							alt={com.user_fullname} 
							src={com.user_image} 
							sx={{ cursor: "pointer", width: 120, height: 120, ml: 3, }} 
							onClick={() => handleImgButtonClick(`users/${com.user_id}`)} 
						/>
					</Grid>
				: null}
				<Grid justifyContent="left" item xs>
					<Box sx={{ ml: 3, mt: 1 }}>
					<Typography 
						onClick={() => handleImgButtonClick(`users/${com.user_id}`)} 
						sx={{ cursor: "pointer", fontSize: 25, fontWeight: 401, mb: -1 }} 
					>
						{com.user_fullname}
					</Typography>
					<Typography variant="body1" sx={{ mt:"12px", mb:1 }}>
						{com.content}
					</Typography>	
					<TimeAgoContainer 
						created_at={com.created_at} 
						updated_at={com.updated_at} 
						isDeleted={false} 
						fromLitTextShow={false}
					/>
					</Box>
				</Grid>
					<LitTextListShow key={com.lit_text_id} litText={comLitText}/>
				</Grid>
				</Paper>
			</Grid>
		)
	})
}
