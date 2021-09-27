
export default function CommentType({ comTypes }) {

	const renderTypes = comTypes.map((c) => {
		if (parseInt(c.id) === 1) {
			return (
				<span style={{ color: "darkslateblue", backgroundColor: "cornsilk", padding: 3, marginLeft: 5 }} >{c.name}</span>
			)
		} else if (parseInt(c.id) === 2){
			return(
				<span style={{ color: "darkslategrey", backgroundColor: "cornsilk", padding: 3, marginLeft: 5 }} >{c.name}</span>
			)
		} else {
			return (
				<span style={{ color: "purple", backgroundColor: "cornsilk", padding: 3, marginLeft: 5 }} >{c.name}</span>
			)
		}
	})

	return (
		<span style={{ fontSize: 12, padding: 3, marginLeft: 5, position: "absolute", top: 10, right: 5 }} ><b>
		{renderTypes}
		</b></span>
	)
}