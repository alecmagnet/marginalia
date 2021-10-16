import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function FilterDropdown({ poetryProseValue, handlePoetryProseValue }) {
	return (
		<FormControl sx={{ minWidth: "112px", ml: 3, mt: 1, }} >
			<InputLabel id="filter-by-label">View</InputLabel>
			<Select
				labelId="filter-by-label"
				id="filter-by"
				value={poetryProseValue}
				label="View"
				onChange={handlePoetryProseValue}
				sx={{ bgcolor: "#fefcf9" }}
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
		</FormControl>
	)
}