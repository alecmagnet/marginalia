import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton	from '@mui/material/IconButton'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { Paper, Box, useTheme} from '@mui/material'

export default function OrderDropdown({ litTextsOrder, handleLitTextsOrder, handleReverseClick }) {
	const valuesArr = [
		["author", "Author"],
		["title", "Title"],
		["date", "Date"],
		["activity", "Activity"],
		["added", "Added"],
	]

	// const directionLabel = (val) => {
	// 	let valTag = val.slice(val.length - 3)
	// 	if (valTag === "A-Z") {
	// 		return "(a-z)"
	// 	} else if (valTag === "Z-A") {
	// 		return "(z-a)"
	// 	} else if (valTag === "New") {
	// 		return "(newest first)"
	// 	} else if (valTag === "Old") {
	// 		return "(oldest first)"
	// 	}
	// }


	const theme = useTheme();
	const hoverColor =
		theme.palette.mode === "light"
			? "rgba(0, 0, 0, 0.23)"
			: "rgba(255, 255, 255, 0.23)";
	const activeColor = theme.palette.primary.main;	

	
	return (
		<FormControl sx={{ minWidth: "152px", mt: 1, }} >
			<Paper sx={{ bgcolor: "#fefcf9" }}>
			<InputLabel id="arrange-by-label">Arrange By</InputLabel>
			<Select
				labelId="arrange-by-label"
				id="arrange-by"
				value={litTextsOrder}
				label="Arrange By"
				onChange={handleLitTextsOrder}
				sx={{ bgcolor: "#fefcf9", minWidth: "132px", }}
			>
			{/* TODO: Use this example from NearHuscarl on SO to extend the Select border around the IconButton */}
			{/* <Select
				label="Arrange By"
				sx={{
					bgcolor: "#fefcf9",
					minWidth: "132px",
					"& fieldset": {
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0
					},
					"&&:hover fieldset": {
						borderRight: "none",
						borderLeft: `solid 1px ${hoverColor}`,
						borderTop: `solid 1px ${hoverColor}`,
						borderBottom: `solid 1px ${hoverColor}`
					},
					"&&.Mui-focused fieldset": {
						borderRight: "none",
						borderLeft: `solid 1px ${activeColor}`,
						borderTop: `solid 1px ${activeColor}`,
						borderBottom: `solid 1px ${activeColor}`
					},
					"& + span": {
						display: "flex",
						borderRadius: theme.shape.borderRadius + "px",
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,

						"& button": {
							height: "100%"
						}
					},
					"&:hover + span": {
						borderColor: hoverColor,
						border: `solid 1px ${hoverColor}`,
						borderLeft: "none"
					},
					"&.Mui-focused + span": {
						borderColor: activeColor,
						border: `solid 1px ${activeColor}`,
						borderLeft: "none"
					}
				}}
			> */}
				{valuesArr.map((valueArr, index) => {
					return (
						<MenuItem 
							key={index} 
							value={valueArr[0]}
						>
							{valueArr[1]} 
						</MenuItem>
					)
				})}
			</Select>
			<Box component="span" variant="outlined" elevation={0} 
				sx={{ 
					width: "60px",
					border: 'solid 1px #bdbdbd',
					borderLeft: 'none',
					borderRadius: '5px', 
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					pt: "18px",
					pb: "19px",
				}} 
			>
			<IconButton 
				onClick={handleReverseClick} 
				sx={{ 
					height: "60px",
					// border: 'solid 1px'
				}} 
			>
				<CompareArrowsIcon sx={{ transform: "rotate(90deg)"}}/>
			</IconButton>
			</Box>
			</Paper>
		</FormControl>
	)
}