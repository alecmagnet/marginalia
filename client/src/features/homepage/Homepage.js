import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Grid, Box, ToggleButton, ToggleButtonGroup, Avatar, Paper } from '@mui/material'
import HpButtons from './HpButtons'
import LitTextListShow from "../litTexts/LitTextListShow"
import TimeAgoContainer from '../shared/TimeAgoContainer';

export default function Homepage() {
	const initialState = () => []
	const initialComs = () => "coms"
	const [comments, setComments] = useState(initialState())
	const [litTexts, setLitTexts] = useState(initialState())
	const [comsOrTexts, setComsOrTexts] = useState(initialComs())
	const history = useHistory()

	const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null
	
	const getComments = () => {
		fetch('/recent_comments')
		.then(r => r.json())
		.then(data => setComments(() => data))
	}

	const getLitTexts = () => {
		fetch('/recent_lit_texts')
		.then(r => r.json())
		.then(data => setLitTexts(() => data))
	}

	useEffect(() => {
		getComments()
		getLitTexts()
	}, [])


	const handleComsOrTexts = (event, newOrder) => {
		setComsOrTexts(() => newOrder)
	}

	const handleImgButtonClick = (e) => {
		userState.entities.length === 0 && e !== "signup" ?
    history.push('/login') :
		history.push(`/${e}`)
	}


	const imgBtnTitles = () => {
		const imgBtnConditional = () => {
			if (user) {
				return [
					{
						"name": "Library",
						"value": "texts"
					}, 
					{
						"name": "Members",
						"value": "users"
					},
				]
			} else {
				return [
					{
						"name": "Log in",
						"value": "login"
					}, 
					{
						"name": "Sign up",
						"value": "signup"
					},
				]
			}
		}
		return [
			...imgBtnConditional(),
			{
				"name": "About",
				"value": "about"
			}
		]
	}
	// console.log(imgBtnTitles())

	const images = [
		{
			url: 'https://az334034.vo.msecnd.net/images-5/vanitas-still-life-with-a-candlestick-musical-instruments-dutch-books-a-writing-set-an-astrological-and-a-terrestial-globe-and-an-hourglass-all-on-a-draped-table-evert-collier-1662-55185426.jpg',
			title: imgBtnTitles()[0].name,
			value: imgBtnTitles()[0].value,
			width: '33.33%',
		},
		{
			url: 'https://image.invaluable.com/housePhotos/sothebys/97/580697/H0046-L88399130.jpg',
			title: imgBtnTitles()[1].name,
			value: imgBtnTitles()[1].value,
			width: '33.34%',
		},
		{
			url: 'https://i.pinimg.com/originals/3b/2e/92/3b2e9253eb51787a860a36807702c66e.jpg',
			title: imgBtnTitles()[2].name,
			value: imgBtnTitles()[2].value,
			width: '33.33%',
		},
	]


	const toggleArr = [
		["coms", "Newest Comments"],
		["texts", "Recently Added Texts"]
	]



	const displayRecentComments = () => {
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
					<Grid item xs="auto">
							<Avatar 
								alt={com.user_fullname} 
								src={com.user_image} 
								sx={{ cursor: "pointer", width: 120, height: 120, ml: 3, mr: 1, mt: 0 }} 
								onClick={() => handleImgButtonClick(`users/${com.user_id}`)} 
							/>
					</Grid>
					<Grid justifyContent="left" item>
						<Box sx={{ ml: 2, mt: 1 }}>
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

	const displayTextPreviews = () => 
		litTexts.sort(
			(a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
		).map(
			text => <LitTextListShow key={text.id} litText={text}/>
		)


	return(
		<Grid container justifyContent="center">

			<Grid item xs={10} sx={{ mt: 3 }}>
				<HpButtons images={images} handleImgButtonClick={handleImgButtonClick} />
			</Grid>

			<Grid item xs={12}>
				<Typography 
					id="top" 
					variant="h2" 
					textAlign="center" 
					sx={{ pt:2, pb:2, fontWeight: 410 }}
				>
					Recent Activity
				</Typography>
			</Grid>


			{comments.length > 0 && litTexts.length >0 ?
				<>
					<Box textAlign="center" sx={{ pb: 2 }}>
						<ToggleButtonGroup
							exclusive
							value={comsOrTexts}
							onChange={handleComsOrTexts}
							aria-label="Newest comments or recent texts"
						>
							{toggleArr.map(el => {return (
								<ToggleButton 
									key={el[0]}
									value={el[0]}
									aria-label={el[1]}
									sx={{ color: "fff"}}
								>
									{el[1]}
								</ToggleButton>
							)})}
						</ToggleButtonGroup>
					</Box>

					{comsOrTexts === "coms" ? 
						displayRecentComments()
					:
						<Grid container item xs={10}>
							{displayTextPreviews()}
						</Grid>
					}
				</>
			: 
				<div className="centered-in-window" >
						<div className="dot-flashing"></div>
				</div>
			}					
		</Grid>
	)
}