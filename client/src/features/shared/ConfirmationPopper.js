import { Button, Popper, Fade, Box } from '@mui/material'

export default function ConfirmationPopper({ 
	handleDeleteClick, 
	handleDelete,
	deleteClicked, 
	anchorEl, 
	popperId,  
}) {

	console.log(anchorEl)

	return (
		<Popper 
			id={popperId} 
			open={deleteClicked} 
			anchorEl={anchorEl} 
			// placement="top" 
			modifiers={[
				{
					name: 'preventOverflow',
					enabled: true,
					options: {
						altAxis: true,
						altBoundary: true,
						tether: true,
						rootBoundary: 'document',
						padding: 8,
					},
				}
			]}
			transition>
			{({ TransitionProps }) => (
				<Fade {...TransitionProps} timeout={350}>
					<Box sx={{ border: 1, p: 3, m: 2, bgcolor: 'background.paper', display:"flex", justifyContent: "center", borderColor: "#660000" }}>
							<Button variant="contained" onClick={handleDeleteClick} sx={{ mr: 4, mb: 2, bgcolor: "6d4c41" }}>
								Cancel
							</Button>
							<Button variant="contained" onClick={handleDelete} sx={{ mb: 2, bgcolor: "#660000" }}>
								Delete
							</Button>
						{/* </Box> */}
					</Box>
				</Fade>
			)}
		</Popper>		
	)
}