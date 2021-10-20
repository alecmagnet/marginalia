import { useState, } from "react"
import { useDispatch } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import parse from 'html-react-parser'
import { Grid, Paper, TextField, Button, Typography, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { postLitText } from '../litTextsSlice' 
import LastName from "./LastName"

export default function LitTextNewForm({ handleLitTextsOrder, handleNewClick, handlePoetryProseValue }) {
	const [storyOrPoem, setStoryOrPoem] = useState("")
	const [ceOrBce, setCeOrBce] = useState("ce")
	const [quillData, setQuillData] = useState("")
	const [previewClicked, setPreviewClicked] = useState(false)
	const [notNum, setNotNum] = useState(false)
	const [famNameFirst, setFamNameFirst] = useState(false)
	const [formData, setFormData] = useState({
		title: "",
		first_name: "",
		last_name: "",
		pubdate: "",
		content: "",
		prose: false,
		fam_name_first: false,
		translator: ""
	})
	console.log("formData", formData)

	const dispatch = useDispatch()
	// const errors = useSelector(state => state.litTexts.errors)

	const handleProseBoolean = (b) => {
		setFormData(formData => {return ({
			...formData,
			prose: b
		})})
	}
	const handleStoryOrPoemClick = (event, value) => {
		setStoryOrPoem(value)
		if (value === "Story") {
			handleProseBoolean(true)
		} else if (value === "Poem") {
			handleProseBoolean(false)
		}
	}

	const handleCeOrBceBoolean = (value) => {
		const absolute = () => Math.abs(parseInt(formData.pubdate))
		const date = () => value.includes("b") ? -absolute() : absolute()
		setFormData(formData => {return ({
			...formData,
			pubdate: date()
		})})
	}
	const handleCeOrBce = (event, value) => {
		if (value !== null) {
			setCeOrBce(() => value)
			handleCeOrBceBoolean(value)
		}
	}

	const handleFamNameFirstClick = () => {
		setFamNameFirst(prev => !prev)
		setFormData(prev => { return({
			...prev,
			fam_name_first: !prev.fam_name_first
		})})
	}

	const handleFormChange = (e) => {
		const { name, value } = e.target
		const cleanValue = () => {
			if (name === "pubdate") {
				// let noSpace = value.replace(/\s+$/, "")
				(/\D/).test(value) ? setNotNum(true) : setNotNum(false)
				let justNum = value.replace(/^\D*/, "").replace(/\D+\d*\D*$/, "")
				return parseInt(justNum)
			} else {
				return value
			}
		}
		setFormData((formData) => {
			return (
				{
					...formData,
					[name]: cleanValue(),
				}
			)
		})
	}

	const wrapTextContent = data => {
		if (storyOrPoem === "Poem") {
			return (<div className="poetry">{data}</div>)
		} else {
			return (<div>{data}</div>)
		}		
	}
	
	const handleQuillChange = (content) => {
		setQuillData(content)
		handleFormChange({ target: { name: "content", value: content } })
	}

	const parseQuillData = () => {
		let parsedData = parse(`${quillData}`)
		let returnData = wrapTextContent(parsedData)
		return returnData
	}

	const displayDate = () => {
		const value = formData.pubdate
		return value < 0 ? `${Math.abs(value)} BCE` 
		: value <1000 ? `${value} CE`
		: value
	}

	const handlePreviewClick = () => {
		setPreviewClicked(!previewClicked)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("handleSubmit.formData:", formData)
		dispatch(postLitText(formData))
		setFormData({
			title: "",
			first_name: "",
			last_name: "",
			pubdate: "",
			content: "",
			prose: false,
			fam_name_first: false,
			translator: ""
		})
		setQuillData("")
		setPreviewClicked(false)
		setStoryOrPoem("")
		setFamNameFirst(FontFaceSetLoadEvent)
		handleLitTextsOrder({ target: { value: "addedNew" }})
		handlePoetryProseValue({ target: { value: "all" }})
		handleNewClick()
	}

	const qFormats = [
		'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet'
	]

	const qModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  }

	const CustomWidthTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))({
		[`& .${tooltipClasses.tooltip}`]: {
			maxWidth: 400,
		},
	});

	return (
		<Grid item xs={12}>
			<Paper 
				elevation={6} 
				sx={{ p:3, m: 3, mt: 3, backgroundColor: "#ebe3e1" }}
			>
				<Typography 
					variant="h5" 
					sx={{ textAlign:"center", mb: 1 }} 
				>
					<b>Add a New Story or Poem</b>
				</Typography>

				<form display="flex" onSubmit={handleSubmit} >
					<TextField
						onChange={handleFormChange}
						autoComplete="title"
						name="title"
						required
						id="title"
						label="Title"
						autoFocus
						sx={{ mx: "5%", my: 1, backgroundColor: "#fff", width: "90%" }}
					/>

					<LastName famNameFirst={famNameFirst} handleFamNameFirstClick={handleFamNameFirstClick} handleFormChange={handleFormChange} />

					{notNum ? <Typography variant="body2" sx={{ color: "#660033", textAlign: "center", mt: 1 }}>We're sorry. <b>Year</b> can only include numbers for now. </Typography> : null}
					<Grid container item xs={12} sx={{ mx: "5%", width: "90%"}}>
						<Grid container item xs={6} sx={{ pr: "20px"}}>
							<Grid item xs>
								<TextField
									onChange={handleFormChange}
									autoComplete="pubdate"
									name="pubdate"
									required
									id="pubdate"
									label="Year"
									fullWidth
									sx={{ mt: "3px", mb: 2, mr: "2px", backgroundColor: "#fff", }}
								/>
							</Grid>
							<Grid item xs="auto">
								<ToggleButtonGroup
									value={ceOrBce}
									exclusive
									onChange={handleCeOrBce}
									aria-label="CE or BCE"
									sx={{ bgcolor: "#fefcf9", mt: "3px", height: "61.75px", }}
								>
									<ToggleButton 
										value="bce"
										aria-label="BCE"
									>
										BCE
									</ToggleButton>
									<ToggleButton 
										value="ce"
										aria-label="CE"
									>
										CE
									</ToggleButton>
								</ToggleButtonGroup>
							</Grid>
						</Grid>
						<Grid item xs={6} sx={{ pl: "20px"}}>
								<TextField
									onChange={handleFormChange}
									autoComplete="translator"
									name="translator"
									id="translator"
									label="Translator"
									fullWidth
									sx={{ mt: "3px", mb: 2, backgroundColor: "#fff", }}
								/>
						</Grid>
					</Grid>


					<ReactQuill 
						theme="snow"
						value={quillData}
						onChange={handleQuillChange}
						placeholder="Paste and edit the text of the story or poem here"
						style={{ 
							backgroundColor: "#fff", 
							width: "90%",
							marginRight: "5%",
							marginLeft: "5%"
						}}
						formats={qFormats}
						modules={qModules}
					/>

					<Box textAlign="center">
						<ToggleButtonGroup
							value={storyOrPoem}
							exclusive
							onChange={handleStoryOrPoemClick}
							aria-label="Story or Poem"
							sx={{ bgcolor: "#fefcf9", mt: 2, }}
						>
							<ToggleButton 
								value="Poem"
								aria-label="Poem"
								// sx={{ p: 2 }}
							>
								Poetry
							</ToggleButton>
							<ToggleButton 
								value="Story"
								aria-label="Story"
								// sx={{ p: 2 }}
							>
								Prose
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>

					{storyOrPoem === "Story" || storyOrPoem === "Poem" ? 
						<div>
							<br/>
							<Paper 
								elevation={9} 
								sx={{ p:3, m: 1, mx: "8%", backgroundColor: "#fefcf9" }}
							>
								<Grid container wrap="nowrap">
									<Grid item xs={12}>
								<Typography variant="h6" sx={{ textAlign:"center", textColor: "#616161", fontVariant: "small-caps", mb: 1 }}><em>preview</em></Typography>
								<Typography variant="h4" sx={{ textAlign:"center" }}><b>{formData.title}</b></Typography>
								<Typography variant="h6" sx={{ textAlign:"center" }}>{`${formData.first_name} ${formData.last_name}`}</Typography>
								<Typography variant="subtitle1" sx={{ textAlign:"center" }}><em>{displayDate()}</em></Typography>
									<Grid container wrap="nowrap">
										<Grid item xs={12} justifyContent="center" sx={{ display: "flex", }}>
											<div style={{ position: "flex", }} >
												<Typography variant="body1" sx={{ pb:3, pr:3, pl:3, pt:2, }}>
													{parseQuillData()}
												</Typography>
												</div>
										</Grid>
									</Grid>
								</Grid>
								</Grid>
							</Paper>
							<br/>
						</div>
					: null }

					{quillData.length > 0 && (storyOrPoem === "Story" || storyOrPoem === "Poem") ?
						<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 1, mb: 2, }}
							>
								Submit
							</Button>
						</div>
					: storyOrPoem === "Story" || storyOrPoem === "Poem" ?
						<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
							<Tooltip title="Text cannot be blank" arrow>
								<span>
									<Button
										disabled
										variant="contained"
										sx={{ mt: 2, mb: 2, }}
									>
										Submit
									</Button>
								</span>
							</Tooltip>
						</div>
					:
						<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
							<Tooltip title="Please select POETRY or PROSE first" arrow>
								<span>
									<Button
										disabled
										variant="contained"
										sx={{ mt: 2, mb: 2, }}
									>
										Submit
									</Button>
								</span>
							</Tooltip>
						</div>
					}

				</form>
			</Paper>
		</Grid>
	)
}