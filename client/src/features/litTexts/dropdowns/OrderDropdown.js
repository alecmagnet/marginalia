import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function OrderDropdown({ litTextsOrder, handleLitTextsOrder }) {
	const valuesArr = [
		["authorA-Z", "Author"],
		["authorZ-A", "Author"],
		["titleA-Z", "Title"],
		["titleZ-A", "Title"],
		["dateNew", "Date"],
		["dateOld", "Date"],
		["activityNew", "Activity"],
		["activityOld", "Activity"],
		["addedNew", "Added"],
		["addedOld", "Added"]
	]

	const directionStyle = { 
		color: "#616161", 
		fontSize: "85%", 
		paddingLeft: "4px" 
	}

	const directionLabel = (val) => {
		let valTag = val.slice(val.length - 3)
		if (valTag === "A-Z") {
			return "(a-z)"
		} else if (valTag === "Z-A") {
			return "(z-a)"
		} else if (valTag === "New") {
			return "(newest first)"
		} else if (valTag === "Old") {
			return "(oldest first)"
		}
	}

	const directionElement = (val) => {
		return (
			<span style={directionStyle}>
				{directionLabel(val)}
			</span>
		)
	}
	
	return (
		<FormControl sx={{ minWidth: "232px", ml: 0, mt: 1, }} >
			<InputLabel id="arrange-by-label">Arrange By</InputLabel>
			<Select
				labelId="arrange-by-label"
				id="arrange-by"
				value={litTextsOrder}
				label="Arrange By"
				onChange={handleLitTextsOrder}
				sx={{ bgcolor: "#fefcf9" }}
			>
				{valuesArr.map((valueArr, index) => {
					return (
						<MenuItem 
							key={index} 
							value={valueArr[0]}
						>
							{valueArr[1]} {directionElement(valueArr[0])}
						</MenuItem>
					)
				})}
			</Select>
		</FormControl>
	)
}