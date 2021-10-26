import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Paper, Grid } from '@mui/material'
import UserTextComPreview from './UserTextComPreview'
import LitTextListShow from "../litTexts/LitTextListShow"

export default function UserTextShow({ id, comments }) {
  const litTextsState = useSelector((state) => state.litTexts)
	const litTextsArr = [...litTextsState.entities]

	const litText = () => [...litTextsArr].find((t) => t.id === id)
	const renderComments = () => {
		const commentsArr = comments.filter((c) => c.lit_text_id === id)
		return (
			commentsArr.map((c) => <UserTextComPreview key={`ltc${c.id}`} comment={c}/>)
		)
	}
	// console.log("litTexts from UserTextShow", litText())
	
	const history = useHistory()
	const handleClick = () => {
		history.push(`/texts/${id}`)
	}

	return (
		<>
		{litTextsArr.length === 0 ?
			<div className="centered-in-window" >
					<div className="dot-flashing"></div>
			</div>
		:
			<Grid container item xs={10} alignItems="center" justifyContent="Center">
			<Paper 
				sx={{ cursor: "pointer", m: 2, mt: 0, p: 3, borderRadius: 2, }} 
				onClick={() => handleClick()} 
				elevation={3}
			>
				<div>
				{renderComments().length > 0 ? renderComments() : "previews loading..."}
				</div>
				<LitTextListShow key={litText().id} litText={litText()}/>
				</Paper>
				</Grid>
		}</>
	)
}