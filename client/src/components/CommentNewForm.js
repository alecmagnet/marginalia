import { useState } from 'react'

export default function CommentNewForm({ user, lit_text_id, parent_comment_id, onAddComment }) {
  const [formData, setFormData] = useState({
		user_id: user.id,
		lit_text_id: lit_text_id,
		parent_comment_id: parent_comment_id,
		content: ""
	});

	const addNewWhat = parent_comment_id ? "Add new reply" : "Add new comment"

  function handleChange(e) {
    e.preventDefault();
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((resp) => resp.json())
    .then((data) => {
      onAddComment(data)
			setFormData({
				...formData,
				content: ""
		})
    });
  }
  
  return (
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<form style={{ 'width': '90%' }} onSubmit={handleSubmit}>
					<label><p><b>{addNewWhat}</b></p>
					<textarea 
						placeholder="Tell us your thoughts..."
						value={formData.content} 
						id="content"
						name="content"
						onChange={handleChange}
						style={{ width: "75%" }}
					/></label>
					<div style={{ height: 7 }} />
					<button floated="right" primary type='submit'>Post</button>
				</form>
			</div>
    </div>
  )
}