import { useState, } from "react"
import { useDispatch } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import parse from 'html-react-parser'
import { Grid, Paper, TextField, Button, Typography, ToggleButton, ToggleButtonGroup, Box, Tooltip } from '@mui/material'

export default function LitTextNewForm() {
	const [errors, setErrors] = useState([])
	const [isHidden, setIsHidden] = useState(false)
	const [storyOrPoem, setStoryOrPoem] = useState("Poem")
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		pubdate: "",
		content: "",
		prose: false
	})
	const [quillData, setQuillData] = useState("")
	const [addStoryOrPoem, setAddStoryOrPoem] = useState("Add a New Poem")
	const [previewClicked, setPreviewClicked] = useState(false)
	const [areYouSure, setAreYouSure] = useState(<span>Are you sure your submission is a <b>POEM?</b></span>)

	const dispatch = useDispatch()

	const handlePreviewClick = () => {
		setPreviewClicked(!previewClicked)
	}

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
			setAddStoryOrPoem(`Add a New Story or Other Prose Work`)
			setAreYouSure(<span>Are you sure your submission is a <b>STORY</b> or other prose work?</span>)
		} else if (value === "Poem") {
			handleProseBoolean(false)
			setAddStoryOrPoem(`Add a New ${value}`)
			setAreYouSure(<span>Are you sure your submission is a <b>POEM?</b></span>)
		} else {
			setAddStoryOrPoem(`Add a New Story or Poem`)
			setAreYouSure(<span>Is your submission a <b>POEM</b>? Or is it a <b>STORY</b> or other prose work?</span>)

		}
	}

	const handleFormChange = (e) => {
		setFormData((formData) => {
			return (
				{
					...formData,
					[e.target.name]: e.target.value,
				}
			)
		})
	}

	const handleQuillChange = (content) => {
		console.log("handleQuillCHANGE", content)
		setQuillData(content)
	}

	const parseQuillData = () => {
		let parsedData = parse(`${quillData}`)
		if (storyOrPoem === "Poem") {
			return (<div classname="poetry">{parsedData}</div>)
		} else {
			return (<div>{parsedData}</div>)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let parsedData = parseQuillData()
		handleFormChange({ target: { name: "content", value: parsedData } })
		console.log("handleSubmit.formData:", formData)
		dispatch(formData)
	}

	const qFormats = [
		'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
	]

	const qModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean']
    ],
  }

	return (
		<Grid item xs={12}>
			<Paper 
				elevation={6} 
				justifyContent="center"
				sx={{ p:3, m: 3, backgroundColor: "#fffaf5" }}
			>
				<Typography 
					variant="h5" 
					sx={{ textAlign:"center", mb: 1 }} 
				>
					<b>{addStoryOrPoem}</b>
				</Typography>

				<Box textAlign="center">
					<ToggleButtonGroup
						value={storyOrPoem}
						exclusive
						onChange={handleStoryOrPoemClick}
						aria-label="Story or Poem"
						sx={{ bgcolor: "#fff3e6", my: 1 }}
					>
						<ToggleButton 
							value="Story"
							aria-label="Story"
						>
							It's Prose
						</ToggleButton>
						<ToggleButton 
							value="Poem"
							aria-label="Poem"
						>
							It's Poetry
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>

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
					<TextField
						onChange={handleFormChange}
						autoComplete="author"
						name="author"
						required
						id="author"
						sx={{ mx: "5%", my: 1, backgroundColor: "#fff", width: "90%" }}
						label="Author"
					/>
					<TextField
						onChange={handleFormChange}
						autoComplete="pubdate"
						name="pubdate"
						required
						id="pubdate"
						label="Year"
						sx={{ mt: 1, mb: 2, mx: "5%", backgroundColor: "#fff", width: "90%" }}
					/>
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

						<div style={{ width: "100%", display: "flex", justifyContent: "center", alignText: "center"  }}>
						<Tooltip title="Check out the preview before you submit" arrow>
							<Button 
								onClick={handlePreviewClick}
								variant="contained"
								sx={{ mt: 2, p: 2 }}
							>
								Preview
							</Button>
						</Tooltip>
						</div>
            {previewClicked ? 
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
									<Typography variant="h6" sx={{ textAlign:"center" }}>{formData.author}</Typography>
									<Typography variant="subtitle1" sx={{ textAlign:"center" }}><em>{formData.pubdate}</em></Typography>
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
								<div style={{ color: "#660033", textAlign: "center", width: "100%" }} >{areYouSure}</div>
								<br/>
								{storyOrPoem === "Story" || storyOrPoem === "Poem" ?
									<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
										<Button
											type="submit"
											variant="contained"
											sx={{ mt: 1, mb: 2, p: 2 }}
										>
											Submit
										</Button>
									</div>
								:
									<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
											<Button
												disabled
												variant="contained"
												sx={{ mt: 2, mb: 2, p: 2 }}
											>
												Submit
											</Button>
									</div>
								}
							</div>
						:
							<div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
									<Button
										disabled
										variant="contained"
										sx={{ mt: 2, mb: 2, p: 2 }}
									>
										Submit
									</Button>
							</div>
						}
				</form>
			</Paper>
		</Grid>
	)
}