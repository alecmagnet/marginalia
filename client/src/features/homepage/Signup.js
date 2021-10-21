import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { addSignupUser } from '../users/userSlice'
import LastName from '../litTexts/litTextNewForm/LastName'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

function Signup() {
  const [formData, setFormData] = useState({
		username: "",
    first_name: "",
    last_name: "",
    fam_name_first: false,
		password: "",
		fullname: "",
		image: "",
		bio: "",
		// usertype: ""
	});

	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()
	const history = useHistory()

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		})
	}

	const handleFamNameFirstClick = () => {
		setFormData({
			...formData,
			fam_name_first: !formData.fam_name_first,
		})		
	}
  
  function handleSubmit(e) {
    e.preventDefault();
		// dispatch(signupUser(formData))
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
		.then((r) => r.json())
		.then((data) => {
			if(data.errors) setErrors(data.errors)
			else {
				setErrors([])
				dispatch(addSignupUser(data))
				history.push("/")
			}
		});
  }

  const handleLoginClick = () => {
    history.push('/login')
  }

  const nameField = (label) => {
		const firstLast = label.includes("amily") ? "last_name" : "first_name"
		const nameValue = label.includes("amily") ? formData.last_name : formData.first_name
		return (
			<TextField
				onChange={handleChange}
				autoComplete={firstLast}
				name={firstLast}
				value={nameValue}
				required
				id={firstLast}
				sx={{ backgroundColor: "#f5f5f5", }}
				label={label}
			/>			
		)    
  }

	const compareArrow = () => {
		return (
				<Grid item xs="auto">
					<CompareArrowsIcon 
						onClick={handleFamNameFirstClick}
						sx={{ height: "62px", color: "#3e2723", cursor: "pointer" }}
					/>
				</Grid>
		)
	}

	return (
			<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#8c7b75" }}>
            <LockOutlinedIcon size="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
           
            {errors ? errors.map(e => <div key={e} style={{ color: "#660033", textAlign: "center" }} >{e}</div>) : null}
           
            {/* <TextField
              onChange={handleChange}
              autoComplete="fullname"
              name="fullname"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              sx={{ bgcolor: "#f5f5f5" }}
            /> */}

            <TextField
              onChange={handleChange}
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="new-username"
              sx={{ mt: 3, bgcolor: "#f5f5f5" }}
              autoFocus
            />

            <Grid container item xs={12} sx={{ mt: 3, }}>
              {formData.fam_name_first ? 
                <>
                  <Grid item xs sx={{ mr: "5px" }}>
                    {nameField("Family name")}
                  </Grid>
                  {compareArrow()}
                  <Grid item xs sx={{ ml: "5px" }}>
                    {nameField("Given name")}
                  </Grid>
                </>
              :
                <>
                  <Grid item xs sx={{ mr: "5px" }}>
                    {nameField("Given name")}
                  </Grid>
                  {compareArrow()}
                  <Grid item xs sx={{ ml: "5px" }}>
                    {nameField("Family name")}
                  </Grid>
                </>
              }
            </Grid>


				{/* <LastName 
					famNameFirst={formData.fam_name_first} 
					handleFamNameFirstClick={handleFamNameFirstClick} 
					handleFormChange={handleChange} 
					firstName={formData.first_name}
					lastName={formData.last_name}
					isAuthor={false}
				/> */}

            <TextField
              onChange={handleChange}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={{ mt: 2, bgcolor: "#f5f5f5"  }}
              autoComplete="new-password"
            />

            <TextField
              onChange={handleChange}
              fullWidth
              name="image"
              label="Profile Picture URL"
              id="image"
              sx={{ mt: 3, bgcolor: "#f5f5f5" }}
              autoComplete="new-image"
            />

            <TextField
              onChange={handleChange}
              fullWidth
              name="bio"
              label="About Me"
              id="bio"
              autoComplete="new-bio"
              sx={{ mt: 3, bgcolor: "#f5f5f5" }}
            />
                
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box display="flex" justifyContent="center">
								<Typography variant="subtitle" sx={{ color: "#546e7a", textDecoration: "underline", cursor: "pointer"}} onClick={handleLoginClick} >
									Already have an account? Sign in
								</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
  );


	// 	<div >
	// 		{errors ? errors.map(e => <div key={e} style={{ color: "red" }} >{e}</div>) : null}
	// 		<form 
	// 			onSubmit={handleSubmit}
	// 			className="centered-in-div" 
	// 			style = {{ 
	// 				width: 156 
	// 			}}
	// 		>
	// 			<input
	// 				style={{ marginTop: 5 }}
	// 				type="text"
	// 				id="username"
	// 				value={formData.username}
	// 				placeholder={"username"}
	// 				onChange={handleChange}
	// 			/>
  //       <div style={{ padding: 5 }} />
	// 			<input
	// 				type="text"
	// 				id="fullname"
	// 				value={formData.fullname}
	// 				placeholder={"full name"}
	// 				onChange={handleChange}
	// 			/>
  //       <div style={{ padding: 5 }} />
	// 			<input
	// 				type="password"
	// 				id="password"
	// 				value={formData.password}
	// 				placeholder={"password"}
	// 				onChange={handleChange}
	// 			/>
  //       <div style={{ padding: 5 }} />
	// 			<input
	// 				type="text"
	// 				id="image"
	// 				value={formData.image}
	// 				placeholder={"profile picture url"}
	// 				onChange={handleChange}
	// 			/>
  //       <div style={{ padding: 5 }} />
	// 			<input
	// 				type="text"
	// 				id="bio"
	// 				value={formData.bio}
	// 				placeholder={"bio"}
	// 				onChange={handleChange}
	// 			/>
  //       <div style={{ padding: 5 }} />
	// 			<button 
	// 				type="submit"
	// 				className="centered-in-div" 
	// 			>Signup</button>
	// 		</form>
  //       <div style={{ padding: 5 }} />
	// 			<Link to='/login'>Already have an account? Log in</Link>
	// 	</div>
  // );
}

export default Signup