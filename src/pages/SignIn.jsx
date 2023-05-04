import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../util/firebase.jsx";
import { login } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import headquarters from '../assets/headquarters.jpg'
import Copyright from '../components/Copyright'
import { Link } from '@mui/material'

const theme = createTheme({
    palette: { primary: { main: '#0464ac' }, secondary: { main: '#04b44c' }, error: { main: '#f44336' } }
})

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false)

    const MySwal = withReactContent(swal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
            .then((response) => {
                dispatch(login({ uid: response.user.uid, email: response.user.email }))
                navigate('/')
            }).catch(() => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to login',
                    text: 'Please check your credentials',
                    confirmButtonText: 'Try again',
                    confirmButtonColor: '#0464ac'
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
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                sx={{ mt: 2 }}
                            >
                                Sign In
                            </Button>
                            <Typography align='center' sx={{ mt: 2 }}>
                                <Link component={RouterLink} to="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Typography>
                            <Copyright sx={{ mt: 2 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}