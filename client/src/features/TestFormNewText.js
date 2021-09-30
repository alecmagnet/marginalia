import { useState } from "react"

function TestFormNewText() {
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		pubdate: "",
		content: "",
	})

	// const [errors, setErrors] = useState(null)

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log("formdata", formData.content)
		// let stringified = JSON.stringify(formData)
		// console.log("stringified", stringified)
		// let jsonified = stringified.json()
		// console.log("jsonified", jsonified)
	}


	return (
		<div className="centered-in-window" >
			<h1>Add a new text</h1>
			{/* {errors?errors.map(e => <div style={{ color: "red" }} >{e}</div>):null} */}
			<form onSubmit={handleSubmit} >
				<input
					className="centered-in-div" 
					type="text"
					id="title"
					value={formData.title}
					placeholder={"title"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					className="centered-in-div" 
					type="text"
					id="author"
					value={formData.author}
					placeholder={"author"}
					onChange={handleChange}
				/>
        <div style={{ padding: 5 }} />
				<input
					className="centered-in-div" 
					type="number"
					id="pubdate"
					value={formData.pubdate}
					placeholder={"publication year"}
					onChange={handleChange}
				/>
        <div style={{ paddingTop: 10 }} />
				<input
					className="centered-in-div" 
					type="textarea"
					id="content"
					value={formData.content}
					placeholder={"content"}
					onChange={handleChange}
				/>
        <div style={{ padding: 5 }} />
				<button 
					type="submit"
					className="centered-in-div" 
				>Submit</button>
			</form>
		</div>
	)
}

export default TestFormNewText