import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { postComment } from './commentsSlice'


export default function CommentNewForm({ litTextId, parentCommentId, onAddComment, replyButtonClick }) {
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

  const [formData, setFormData] = useState({
		user_id: user.id,
		lit_text_id: litTextId,
		parent_comment_id: parentCommentId,
		content: "",
		// com_type_ids: []
	});

	const [comTypes, setComTypes] = useState([])

	const addNewWhat = parentCommentId ? "Add new reply" : "Add new comment"

  function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
  }

	function handleCheck(e) {
		if (comTypes.includes(parseInt(e.target.value))) {
			setComTypes((prevState) => {
				let newArr = prevState.filter((c) => parseInt(c) !== parseInt(e.target.value))
				return [...newArr]
				// console.log("did inc: newArr", newArr)
			})
			console.log("did include", comTypes)
		} else {
			setComTypes((prevState) => [...prevState, parseInt(e.target.value)])
			console.log("did not include", comTypes)
		}
	}

	const dispatch = useDispatch()
	
  function handleSubmit(e) {
    e.preventDefault();
		dispatch(postComment(formData))
		.then(() => {
			setFormData({
				...formData,
				content: ""
			})
			if (parentCommentId) replyButtonClick((prevState) => !prevState)	
		})
	}

  // function handleSubmitOld(e) {
  //   e.preventDefault();
  //   fetch('/comments', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     onAddComment(data)
	// 		setFormData({
	// 			...formData,
	// 			content: ""
	// 		})
	// 		if (parentCommentId) replyButtonClick((prevState) => !prevState)
  //   });
  // }
  
  return (
		<div style={{ padding: 10 }} >
			<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative" }} >
				<form style={{ position: 'relative', width: "85%" }} onSubmit={handleSubmit}>
					<label style={{ width: "70%"}} ><p><b>{addNewWhat}</b></p>
					<textarea 
						placeholder="Tell us your thoughts..."
						value={formData.content} 
						id="content"
						name="content"
						onChange={handleChange}
						style={{ width: "100%" }}
					/></label>
					<div style={{ height: 7 }} />
						<label style={{ marginRight: 10, fontSize: 14 }} > 
							<input type="checkbox" id="1" name="reading" value="1" onChange={(e) => handleCheck(e)} />
							Reading 
						</label>
						<label style={{ marginRight: 10, fontSize: 14 }} > 
							<input type="checkbox" id="2" name="question" value="2" onChange={(e) => handleCheck(e)} />
							Question 
						</label>
						<label style={{ marginRight: 10, fontSize: 14 }} > 
							<input type="checkbox" id="3" name="footnote" value="3" onChange={(e) => handleCheck(e)} />
							Footnote 
						</label>
						{parentCommentId ? 
							<label style={{ marginRight: 10, fontSize: 14 }} >
								<input type="checkbox" id="4" name="answer" value="4" onChange={(e) => handleCheck(e)} />
								Answer 
							</label> 
						: null}
					<div style={{ height: 9 }} />
					<button floated="right" type='submit'>Post</button>
				</form>
			</div>
    </div>
  )
}