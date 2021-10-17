import { ToggleButton, ToggleButtonGroup, Box, } from '@mui/material'

export default function ToggleGroup({ comTypes, handleComTypes, isParent }) {
	return (
		<Box textAlign="center">
			<ToggleButtonGroup
				value={comTypes}
				onChange={handleComTypes}
				aria-label="Comment Types"
				size="small"
				sx={{ bgcolor: "#fefcf9", mb: 1 }}
			>
				<ToggleButton 
					value={1}
					aria-label="Reading"
				>
					Reading
				</ToggleButton>
				<ToggleButton 
					value={2}
					aria-label="Question"
				>
					Question
				</ToggleButton>
				<ToggleButton 
					value={3}
					aria-label="Footnote"
				>
					Footnote
				</ToggleButton>
				{isParent ? 
					<ToggleButton 
						value={4}
						aria-label="Answer"
					>
						Answer
					</ToggleButton>				
				: null }
			</ToggleButtonGroup>
		</Box>
	)
}