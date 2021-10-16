import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function OrderDropdown({ litTextsOrder, handleLitTextsOrder }) {
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
		<FormControl sx={{ minWidth: "232px", ml: 10, bgcolor: "#fefcf9" }} >
			<InputLabel id="arrange-by-label">Arrange By</InputLabel>
			<Select
				labelId="arrange-by-label"
				id="arrange-by"
				value={litTextsOrder}
				label="Arrange By"
				onChange={handleLitTextsOrder}
				// sx={{ p: 1 }}
			>
				<MenuItem value="authorA-Z">
					Author {directionElement("authorA-Z")}
				</MenuItem>
				<MenuItem value="authorZ-A">
					Author {directionElement("authorZ-A")}
				</MenuItem>
				<MenuItem value="titleA-Z">
					Title {directionElement("titleA-Z")}
				</MenuItem>
				<MenuItem value="titleZ-A">
					Title {directionElement("titleZ-A")}
				</MenuItem>
				{/* <MenuItem value="dateNew">
					Date {directionElement("dateNew")}
				</MenuItem>
				<MenuItem value="dateOld">
					Date {directionElement("dateOld")}
				</MenuItem> */}
				<MenuItem value="activityNew">
					Activity {directionElement("activityNew")}
				</MenuItem>
				<MenuItem value="activityOld">
					Activity {directionElement("activityOld")}
				</MenuItem>
				<MenuItem value="addedNew">
					Added {directionElement("addedNew")}
				</MenuItem>
				<MenuItem value="addedOld">
					Added {directionElement("addedOld")}
				</MenuItem>
			</Select>
		</FormControl>
	)
}