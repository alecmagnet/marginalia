import { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"

import { addSignupUser } from '../users/userSlice'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Signup() {
  const [formData, setFormData] = useState({
		username: "",
		password: "",
		fullname: "",
		image: "",
		bio: "",
		// usertype: ""
	});

	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()
	const history = useHistory()
	const theme = createTheme()

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
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

	return (
		<ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						{errors ? errors.map(e => <div key={e} style={{ color: "red" }} >{e}</div>) : null}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
									onChange={handleChange}
                  autoComplete="fullname"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
									onChange={handleChange}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="new-username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
									onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
									onChange={handleChange}
                  fullWidth
                  name="image"
                  label="Profile Picture URL"
                  type="image"
                  id="image"
                  autoComplete="new-image"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
									onChange={handleChange}
                  fullWidth
                  name="bio"
                  label="Bio"
                  type="bio"
                  id="bio"
                  autoComplete="new-bio"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
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