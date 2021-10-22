import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton	from '@mui/material/IconButton'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { Paper, Box } from '@mui/material'

export default function OrderDropdown({ litTextsOrder, handleLitTextsOrder, handleReverseClick }) {
	const valuesArr = [
		["author", "Author"],
		// ["authorZ-A", "Author"],
		["title", "Title"],
		// ["titleZ-A", "Title"],
		["date", "Date"],
		// ["dateOld", "Date"],
		["activity", "Activity"],
		// ["activityOld", "Activity"],
		["added", "Added"],
		// ["addedOld", "Added"]
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
		<FormControl sx={{ minWidth: "152px", mt: 1, }} >
			<Paper sx={{ bgcolor: "#fefcf9" }}>
			<InputLabel id="arrange-by-label">Arrange By</InputLabel>
			<Select
				// variant="standard" 
				labelId="arrange-by-label"
				id="arrange-by"
				value={litTextsOrder}
				label="Arrange By"
				onChange={handleLitTextsOrder}
				sx={{ bgcolor: "#fefcf9", minWidth: "132px", }}
			>
				{valuesArr.map((valueArr, index) => {
					return (
						<MenuItem 
							key={index} 
							value={valueArr[0]}
						>
							{valueArr[1]} 
							{/* {directionElement(valueArr[0])} */}
						</MenuItem>
					)
				})}
			</Select>
			<Box component="span" variant="outlined" elevation={0} sx={{ height: "61px" }}>
			<IconButton onClick={handleReverseClick}>
				<CompareArrowsIcon sx={{ transform: "rotate(90deg)"}}/>
			</IconButton>
			</Box>
			</Paper>
		</FormControl>
	)
}