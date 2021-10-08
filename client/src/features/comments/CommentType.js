import { Tooltip } from '@mui/material'

export default function CommentType({ comTypes }) {

	const renderTypes = comTypes.map((c) => {
		if (parseInt(c.id) === 1) {
			return (
				<Tooltip key={`t${c.id}`} title="Reading" arrow >
					<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
				</Tooltip>
			)
		} else if (parseInt(c.id) === 2) {
			return(
				<Tooltip key={`t${c.id}`} title="Question" arrow >
					<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, 		paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
				</Tooltip>
			)
		} else if (parseInt(c.id) === 3) {
			return (
				<Tooltip key={`t${c.id}`} title="Footnote" arrow >
					<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
				</Tooltip>
			)
		} else {
			return (
				<Tooltip key={`t${c.id}`} title="Answer" arrow >
					<span key={c.id} style={{ color: "#102027", backgroundColor: "#e0e0e0", padding: 7, paddingRight: 11, paddingLeft: 11, marginLeft: 11, borderRadius: "25px", fontSize: 16 }} ><b>{c.name.charAt(0)}</b></span>
				</Tooltip>
			)
		}
	})

	return (
		<span style={{ fontSize: 12, padding: 3, marginLeft: 5, position: "absolute", top: 23, right: 5 }} ><b>
		{renderTypes}
		</b></span>
	)
}