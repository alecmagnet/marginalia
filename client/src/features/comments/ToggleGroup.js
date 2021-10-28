import { ToggleButton, ToggleButtonGroup, Box, } from '@mui/material'

export default function ToggleGroup({ comTypes, handleComTypes, isParentQuestion }) {
	const optionArr = [
		[1, "Reading"],
		[5, "Feelings"],
		[2, "Question"],
		[3, "Lore"],
		[6, "Critique"],
	]
	return (
		<Box textAlign="center">
			<ToggleButtonGroup
				value={comTypes}
				onChange={handleComTypes}
				aria-label="Comment Types"
				size="small"
				sx={{ bgcolor: "#fefcf9", mb: 1 }}
			>
				{isParentQuestion ? 
					<ToggleButton 
						value={4}
						aria-label="Answer"
					>
						Answer
					</ToggleButton>				
				: null }
				{optionArr.map(op => 
					<ToggleButton
						key={op[0]} 
						value={op[0]}
						aria-label={op[1]}
					>	
						{op[1]}			
					</ToggleButton>
				)}
			</ToggleButtonGroup>
		</Box>
	)
}