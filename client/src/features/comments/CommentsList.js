import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { Grid, Tooltip, IconButton } from '@mui/material'
import CommentNewForm from '../comments/CommentNewForm.js'
import CommentShow from "./CommentShow"
import ComTypeDropdown from "./ComTypeDropdown.js"
import AddCommentIcon from '@mui/icons-material/AddComment'

export default function CommentsList({ litTextId }) {
	const [comTypes, setComTypes] = useState(["all"])

	const stateComments = useSelector((state) => state.comments)
	const allComments = useMemo(() => { return [...stateComments.entities]}, [stateComments.entities])
	const showTextComments = allComments.filter((c) => c.lit_text_id === litTextId)
	
	const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })
	
	const parentComments = showTextComments.filter((c) => c.parent_comment_id === null)
	const oldestFirst = parentComments.sort((a, b) => a.id - b.id)

	const isComIncluded = (com) => {
		const typesArr = com.com_types.map(type => type.id)
		const filteredTypes = typesArr.filter((id) => comTypes.includes(id))
		return filteredTypes.length > 0 ? com : null
	}

	const filteredComments = (arr) => {
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

	const renderComments = () => {
		const toFilter = filteredComments(oldestFirst)
		const returnArr = toFilter.map((c) => {
			let replies = showTextComments.filter((r) => r.parent_comment_id === c.id)
			const commentShowCall = 
				<CommentShow 
					key={c.id} 
					comment={c} 
					litTextId={litTextId} 
					replies={replies} 
				/>
			// if (location.hash.includes(`${c.id}`)) {
			// 	return (
			// 		<div ref={comDivRef} key={c.id}>				
			// 			{commentShowCall}
			// 		</div>
			// 	)
			// } else {
				return commentShowCall
			// }
		})
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
					<div style={{ display:"flex", justifyContent:"center", marginBottom: "32px", }}>
						<ComTypeDropdown
							comTypes={comTypes}
							handleComType={handleComType}
						/>
						<Tooltip title="Post a Comment" arrow>
							<IconButton 
								onClick={() => scrollTo("new-comment")} 
								sx={{ color: "#757575",  ml: 3, mt: "10px"}} 
							>
								<AddCommentIcon
									sx={{ mb: "0px", p: 0, fontSize: 50, }}
								/>
							</IconButton>
						</Tooltip>
					</div>
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