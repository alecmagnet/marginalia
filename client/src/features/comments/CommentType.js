import { Tooltip } from '@mui/material'

export default function CommentType({ comTypes }) {

	const renderTypes = () => comTypes.map(c => {
		return (
			<Tooltip 
				key={`t${c.id}`} 
				title={c.name} 
				arrow 
			>
				<span 
					key={c.id} 
					style={{ 
						color: "#102027", 
						backgroundColor: "#e0e0e0", 
						padding: 7, 
						paddingRight: 11, 
						paddingLeft: 11, 
						marginLeft: 11, 
						borderRadius: "25px", 
						fontSize: 16 
					}}
				>
					<b>{c.name.charAt(0)}</b>
				</span>
			</Tooltip>
		)
	})


	return (
		<span style={{ fontSize: 12, padding: 3, marginLeft: 5, position: "absolute", top: 23, right: 5 }} ><b>
		{renderTypes()}
		</b></span>
	)
}