import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function ComTypeDropdown({ comTypes, handleComType }) {
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
				sx={{ bgcolor: "#fefcf9" }}
			>
				<MenuItem value="all">
					All 
				</MenuItem>
				<MenuItem value={1}>
					Readings 
				</MenuItem>
				<MenuItem value={2}>
					Questions 
				</MenuItem>
				<MenuItem value={3}>
					Footnotes 
				</MenuItem>
				<MenuItem value={4}>
					Answers 
				</MenuItem>
			</Select>
		</FormControl>
	)
}