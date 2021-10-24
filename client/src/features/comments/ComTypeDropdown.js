import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function ComTypeDropdown({ comTypes, handleComType }) {
	const itemsArr = [
		["all", "All"],
		[1, "Readings"],
		[2, "Questions"],
		[4, "Answers"],
		[3, "Lore"],
		[5, "Feelings"],
		[6, "Critiques"],
	]
	return (
		<FormControl sx={{ minWidth: "112px", ml: 2, mt: 1, }} >
			<InputLabel id="filter-by-comType">View</InputLabel>
			<Select
				labelId="filter-by-comType"
				id="filter-by"
				multiple
				value={comTypes}
				label="View"
				onChange={handleComType}
				sx={{ bgcolor: "#f4f3f0" }}
			>
				{itemsArr.map(item => 
					<MenuItem key={item[0]} value={item[0]}>
						{item[1]} 
					</MenuItem>
				)}
			</Select>
		</FormControl>
	)
}