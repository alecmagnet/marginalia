import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Paper } from '@mui/material'

export default function FilterDropdown({ poetryProseValue, handlePoetryProseValue }) {
	return (
		<FormControl sx={{ minWidth: "112px", ml: 2, mt: 1, }} >
			<InputLabel id="filter-by-label">View</InputLabel>
			<Paper>
			<Select
				labelId="filter-by-label"
				id="filter-by"
				value={poetryProseValue}
				label="View"
				onChange={handlePoetryProseValue}
				sx={{ minWidth: "112px", bgcolor: "#fefcf9" }}
				>
				<MenuItem value="all">
					All 
				</MenuItem>
				<MenuItem value="poetry">
					Poetry 
				</MenuItem>
				<MenuItem value="prose">
					Prose 
				</MenuItem>
			</Select>
		</Paper>
		</FormControl>
	)
}