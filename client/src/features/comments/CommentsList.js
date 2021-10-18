import { useState } from "react"
import { useSelector } from "react-redux"
import { Grid } from '@mui/material'
import CommentNewForm from '../comments/CommentNewForm.js'
import CommentShow from "./CommentShow"
import ComTypeDropdown from "./ComTypeDropdown.js"

export default function CommentsList({ litTextId }) {
	const [comTypes, setComTypes] = useState(["all"])

	const stateComments = useSelector((state) => state.comments)
	const allComments = [...stateComments.entities]
	const showTextComments = allComments.filter((c) => c.lit_text_id === litTextId)

	const parentComments = showTextComments.filter((c) => c.parent_comment_id === null)
	const oldestFirst = parentComments.sort((a, b) => a.id - b.id)

	const isComIncluded = (com) => {
		const typesArr = com.com_types.map(type => type.id)
		const filteredTypes = typesArr.filter((id) => comTypes.includes(id))
		return filteredTypes.length > 0 ? com : null
	}

	const filteredComments = (arr) => {
		console.log("filteredComments arr", arr, "comTypes", comTypes)
		if (comTypes.includes("all")) {
			return arr
		} else {
			return arr.filter(com => {
				const replies = showTextComments.filter((r) => r.parent_comment_id === com.id)
				console.log("replies", replies)
				const includeReplies = replies.filter((reply) => isComIncluded(reply))
				console.log("includeReplies", includeReplies)
				return isComIncluded(com) || includeReplies.length > 0 ? com : null
			})
		}
	}

	const handleComType = (e) => {
    const {
      target: { value },
    } = e
		// console.log("value", value)
		const inc = (el) => value.includes(el)
		const incAll4 = inc(1) && inc(2) && inc(3) && inc(4) ? true : false
		const incAny = !incAll4 && (inc(1) || inc(2) || inc(3) || inc(4))
		if (comTypes.includes("all") && incAny) {
			setComTypes([...value.filter(el => el !== "all")])
		} else if ((inc("all") && !comTypes.includes("all")) ||
			(incAll4 && !inc("all")) ||
			value.length === 0
		) {
			setComTypes(["all"])
		} else {
			setComTypes([...value])
		}
	}
	console.log("comTypes", comTypes)

	const renderComments = () => {
		const toFilter = filteredComments(oldestFirst)
		console.log("toFilter", toFilter)
		const returnArr = toFilter.map((c) => {
			let replies = showTextComments.filter((r) => r.parent_comment_id === c.id)
			return(
				<CommentShow 
					key={c.id} 
					comment={c} 
					litTextId={litTextId} 
					replies={replies} 
				/>
			)	
		})
		console.log("returnArr", returnArr)
		return returnArr
	}


	return (
		<div>
			<Grid 
				container 
				wrap="nowrap" 
				columns={1}
				justifyContent="center"	
				sx={{ maxWidth: 800, display: "flex" }}
			>
				<Grid 
					container 
					justifyContent="center"
				>
					<ComTypeDropdown
						comTypes={comTypes}
						handleComType={handleComType}
					/>
					{renderComments()}
					<div id="new-comment" />
					<CommentNewForm 
						litTextId={litTextId}
						parentCommentId={null}
						replyButtonClick={null}
						isParentQuestion={false}
					/>
				</Grid>
			</Grid>
		</div>
	)
}