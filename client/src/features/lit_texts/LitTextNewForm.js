import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

function LitTextNewForm() {
	const [errors, setErrors] = useState([])
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		pubdate: "",
		content: "",
	})




}

export default LitTextNewForm