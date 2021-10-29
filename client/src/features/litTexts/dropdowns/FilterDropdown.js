import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function FilterDropdown({ poetryProseValue, handlePoetryProseValue }) {
	const valueArr = ["All", "Poetry", "Prose"]
	return (
		<FormControl sx={{ minWidth: "112px", }} >
			<InputLabel id="filter-by-label">View</InputLabel>
			<Select
				labelId="filter-by-label"
				id="filter-by"
				value={poetryProseValue}
				label="View"
				onChange={handlePoetryProseValue}
				sx={{ minWidth: "112px", bgcolor: "#fefcf9" }}
				>
				{valueArr.map(val => 
					<MenuItem key={val} value={val.toLowerCase()}>
						{val}
					</MenuItem>)
				}
			</Select>
		</FormControl>
	)
}