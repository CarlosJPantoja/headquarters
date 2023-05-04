import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { auth } from '../util/firebase'
import { login } from '../features/auth/authSlice'
import { useState } from 'react'
import { IconButton, InputAdornment, Paper, ThemeProvider, createTheme } from '@mui/material'
import headquarters from '../assets/headquarters.jpg'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Copyright from '../components/Copyright'

const theme = createTheme({
    palette: { primary: { main: '#0464ac' }, secondary: { main: '#04b44c' }, error: { main: '#f44336' } }
})

export default function SignUp() {
	const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '' })
	const [showPassword, setShowPassword] = useState(false)

	const MySwal = withReactContent(Swal)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		createUserWithEmailAndPassword(auth, user.email, user.password)
			.then((response) => {
				dispatch(login({ uid: response.user.uid, email: response.user.email }))
				navigate('/')
			})
			.catch(() => {
				MySwal.fire({
					icon: 'error',
					title: 'Failed to sign up',
					text: 'Please check your information',
					confirmButtonText: 'Try again',
					confrimButtonColor: '#0464ac'
				})
			})
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${headquarters})`,
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item container xs={12} sm={8} md={5} alignItems="center" component={Paper}>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: "center"
						}}
					>
						<Typography component="h1" variant="h5">
							Headquarters
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								autoComplete="given-name"
								margin="normal"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={user.firstname}
								onChange={(e) => setUser({ ...user, firstname: e.target.value })}
							/>
							<TextField
								required
								margin="normal"
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
								value={user.lastname}
								onChange={(e) => setUser({ ...user, lastname: e.target.value })}
							/>
							<TextField
								required
								margin="normal"
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type={showPassword ? "text" : "password"}
								id="password"
								autoComplete="current-password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton type="button" aria-label="visibility" onClick={handleShowPassword}>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={user.email === '' || user.password === '' || user.firstname === '' || user.lastname === ''}
								sx={{ mt: 2 }}
							>
								Sign up
							</Button>
							<Typography align='center' sx={{ mt: 2 }}>
								<Link component={RouterLink} to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Typography>
							<Copyright sx={{ mt: 2 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}