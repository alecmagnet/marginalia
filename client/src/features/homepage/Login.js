import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { addLoginUser } from '../users/userSlice'
import { fetchLitTexts } from '../litTexts/litTextsSlice'
import { fetchAllUsers } from '../users/allUsersSlice'
import { fetchComments} from '../comments/commentsSlice'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [errors, setErrors] = useState([])

	const userState = useSelector((state) => state.user)

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		fetch("/login", {
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
				dispatch(addLoginUser(data))
				dispatch(fetchLitTexts())
				dispatch(fetchAllUsers())
				dispatch(fetchComments())					
				history.push('/')
			}
		});  
	}

	const handleSignupClick = () => {
		history.push('/signup')
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
            <LockOutlinedIcon size="large"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						{errors?errors.map(e => <div key={e.id} style={{ color: "#660033", textAlign: "center" }} >{e}</div>):null}
						{userState.entities.length > 0 ? <h1>You are already logged in!</h1> : null}
            <TextField
							onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
							value={formData.username}
							sx={{ bgcolor: "#f5f5f5" }}
              autoFocus
            />
            <TextField
							onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
							value={formData.password}
							sx={{ bgcolor: "#f5f5f5" }}
              autoComplete="current-password"
            />		
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
								<Typography variant="subtitle" sx={{ color: "#455a64", textDecoration: "underline", cursor: "pointer"}} onClick={handleSignupClick} >
									Don't have an account? Sign Up
								</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
	)
}