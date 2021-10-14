import { useState, } from "react"
import ReactQuill from "react-quill"
// import Quill from "quill"
import "react-quill/dist/quill.snow.css"
import parse from 'html-react-parser'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { Grid, Paper, TextField, TextareaAutosize, Checkbox, Button, Typography, ToggleButton, ToggleButtonGroup, } from '@mui/material'

export default function LitTextNewForm({ litText }) {
	const [errors, setErrors] = useState([])
	const [isHidden, setIsHidden] = useState(false)
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		pubdate: "",
		content: "",
	})
	const [quillData, setQuillData] = useState("")

	let addOrEdit = "Add a New Story or Poem"
	if (litText) {
		if (litText.prose) {
			addOrEdit = "Edit Story"
		} else {
			addOrEdit = "Edit Poem"
		}
	}

	if (litText) setFormData(litText)

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

	const handleQuillSubmit = (content) => {
		console.log("handleQuillSUBMIT", content)
		let cfg = {} 
		let converter = new QuillDeltaToHtmlConverter(content, cfg)
		let contentHTML = converter.convert()
		let parsedContent = parse(`${contentHTML}`)
		handleFormChange({ target: { name: "content", value: parsedContent } })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("submitted data:", formData)
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
					<b>{addOrEdit}</b>
				</Typography>
				<form display="flex" >
					<TextField
						onChange={handleFormChange}
						autoComplete="title"
						name="title"
						required
						
						id="title"
						label="Title"
						autoFocus
						sx={{ mx: "10%", my: 1, backgroundColor: "#fefcf9", width: "80%" }}
					/>
					<TextField
						onChange={handleFormChange}
						autoComplete="author"
						name="author"
						required
						id="author"
						sx={{ mx: "10%", my: 1, backgroundColor: "#fefcf9", width: "80%" }}
						label="Author"
					/>
					<TextField
						onChange={handleFormChange}
						autoComplete="pubdate"
						name="pubdate"
						required
						id="pubdate"
						label="Year"
						sx={{ mt: 1, mb: 2, mx: "10%", backgroundColor: "#fefcf9", width: "80%" }}
					/>
					<ReactQuill 
						theme="snow"
						value={quillData}
						onChange={handleQuillChange}
						placeholder="Text of Story or Poem"
						style={{ 
							backgroundColor: "#fefcf9", 
							// minHeight: "100px", 
							width: "80%",
							marginRight: "10%",
							marginLeft: "10%"
						}}
					/>

					<TextField
						onChange={handleFormChange}
						autoComplete="content"
						name="content"
						required
						fullWidth
						id="content"
						label="Content HTML"
						sx={{ 
							mt: 2,
							mb: 1, 
							mx: "10%", 
							backgroundColor: "#fefcf9", 
							width: "80%",
							visibility: isHidden ? "hidden" : "visible" 
						}}
					/>
						<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2, p: 1 }}
            >
              Submit
            </Button>
						</div>
				</form>
			</Paper>
		</Grid>
	)
}