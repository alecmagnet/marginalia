import { Typography, Grid, Box, Button, Tooltip, Paper } from '@mui/material'

export default function AboutPage() {

	const toggleArr = [
		["about", "About"],
		["coding", "Coding"],
		[],
	]

	return(
		<>
		{/* <Grid container justifyContent="center">

			<Grid item xs={10} sx={{ mt: 3 }}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>

				</Box>
			</Grid>
		</Grid>		 */}
    <Grid 
			container 
			justifyContent="Center"	
			alignItems="center"
		>
			<Grid 
				item xs={9} 
				align="center" 
				justify="center">
					<Typography id="top" variant="h2" sx={{ pt:4, pb:3, fontWeight: 399 }}>About <span> </span>
							<Box component="span" sx={{ fontFamily: "Didot", fontWeight: "440", fontSize: 90 }}>
								Marginalia
							</Box>
					</Typography>
			</Grid>
		<Box justifyContent="center" sx={{ width: "90%", mx: "5%", }}>
			{/* <Grid item xs={10}> */}
				<Paper elevation={6} sx={{ p: 6, mt: 6, }}>
					<Typography variant="h4" justify="center" sx={{ mb: 1 }}>
						What is Marginalia?
						{/* Welcome to<span> </span>
							<Box component="span" sx={{ fontFamily: "Didot", fontWeight: "450", fontSize: 55 }}>
								Marginalia
							</Box> */}
					</Typography>
					<Typography variant="body1" sx={{ pt: 1 }} >
						Marginalia is a social reading and annotation site where people can have conversations with one another about literary works they share and read. 
					</Typography>
					<Typography variant="body1" sx={{ pt: 2 }} >
						The word <em>marginalia</em> refers to the notes and markings that readers make in the margins of page. 
					</Typography>
					<Typography variant="body1" sx={{ pt: 2 }} >
						
					</Typography>
					<Typography variant="h4" justify="center" sx={{ mb: 1 }}>
						User Story
					</Typography>
					<Typography variant="body1" sx={{ pt: 2 }} >
						A user can:
						<ul>
							<li>
								Upload poems, stories, and other literary texts 
							</li>
							<li>
								Edit texts they uploaded
							</li>
							<ul>
								<li>
									Or, if the user is a &ldquo;librarian&rdquo; user-type, edit any uploaded text
								</li>
							</ul>
							<li>
								Browse, search, filter, and read those texts
							</li>
							<li>
								Post comments on texts and replies to other comments
 							</li>
							<li>
								Edit and delete their own comments
 							</li>
							<ul>
								<li>
									If a comment has replies or is a reply, deleting it will leave a ghost that says &ldquo;comment was deleted&rdquo; rather than simply vanishing
								</li>
							</ul>
							<li>
								Assign their comments multiple comment types, such &ldquo;question&rdquo; or &ldquo;critique&rdquo;
 							</li>
							<ul>
								<li>
									Add and remove comment types from their comments
								</li>
							</ul>
							<li>
								Browse, search, and filter all comments on a particular text
 							</li>
							<li>
								Browse, search, and filter other users&rsquo; profiles
 							</li>
							<li>
								Post and edit their own profile
 							</li>
							<li>
								Sign up, log in, log out, and remain authorized on refresh
 							</li>
							<li>
								Delete their account
 							</li>
						</ul>
					</Typography>
					<Typography variant="h4" justify="center" sx={{ mb: 1 }}>
						What Did I Learn While Coding It?
					</Typography>
					<Typography variant="body1" sx={{ pt: 1 }} >
					</Typography>
				</Paper>
		</Box>
			</Grid>			
		</>
	)
}