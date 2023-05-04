import { Grid, TextField, Box, MenuItem, Fab } from "@mui/material"
import { doc, setDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import firestore from "../../util/firebase"
import { Cancel, Check, Close, Save } from "@mui/icons-material"
import CryptoJS from 'crypto-js';

const UsersForm = ({ user, users, edit, headquarters, setUser, getHeadquarters }) => {
    const MySwal = withReactContent(Swal)

    const handleSave = (event) => {
        event.preventDefault()
        if(users.filter(u => u.id !== user.id).filter(u => u.email.trim().toLowerCase() === user.email.trim().toLowerCase()).length > 0) {
            MySwal.fire({
                title: 'Email already exists!',
                text: "Please, try with another email.",
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#0464ac'
            })
            return
        }
        MySwal.fire({
            title: 'User saved!',
            text: "You can see it in the table below.",
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0464ac'
        })
        if (!edit) {
            user.password = CryptoJS.SHA512(user.password).toString()
        }
        setDoc(doc(firestore, "users", user.id), user)
            .then(() => {
                setUser(null)
                getHeadquarters()
            })
    }

    const handleCancel = () => {
        setUser(null)
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSave}>
                <Grid container item spacing={3} xs={12} sm={12} paddingX={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            autoFocus
                            id="user-firstname"
                            name="user-firstname"
                            label="First name"
                            fullWidth
                            autoComplete="user-firstname"
                            variant="standard"
                            value={user.firstname}
                            onChange={(event) => setUser({ ...user, firstname: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="user-lastname"
                            name="user-lastname"
                            label="Last name"
                            fullWidth
                            autoComplete="user-lastname"
                            variant="standard"
                            value={user.lastname}
                            onChange={(event) => setUser({ ...user, lastname: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="user-email"
                            name="user-email"
                            label="Email"
                            fullWidth
                            autoComplete="user-email"
                            variant="standard"
                            value={user.email}
                            onChange={(event) => setUser({ ...user, email: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="password"
                            id="user-password"
                            name="user-password"
                            label="Password"
                            fullWidth
                            autoComplete="user-password"
                            variant="standard"
                            disabled={edit}
                            value={user.password}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            select
                            id="user-headquarter"
                            name="user-headquarter"
                            label="Headquarter"
                            fullWidth
                            autoComplete="user-headquarter"
                            variant="standard"
                            value={user.headquarter}
                            onChange={(event) => setUser({ ...user, headquarter: event.target.value })}
                            SelectProps={{
                                style: { textAlign: 'left' }
                            }}
                        >
                            {headquarters.map((headquarter) => (
                                <MenuItem key={headquarter.id} value={headquarter.id}>
                                    {headquarter.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="user-validuntil"
                            name="user-validuntil"
                            label="Valid until"
                            fullWidth
                            autoComplete="user-validuntil"
                            variant="standard"
                            value={user.validuntil}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={(event) => setUser({ ...user, validuntil: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            select
                            id="user-active"
                            name="user-active"
                            label="Active"
                            fullWidth
                            autoComplete="user-active"
                            variant="standard"
                            value={user.active}
                            onChange={(event) => setUser({ ...user, active: event.target.value })}
                            SelectProps={{
                                style: { textAlign: 'left' }
                            }}
                        >
                            <MenuItem key={0} value={false}>
                                <Close color="error" />
                            </MenuItem>
                            <MenuItem key={1} value={true}>
                                <Check color="secondary" />
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid container item xs={6} sm={6} justifyContent={"right"}>
                        <Fab type="submit" color="primary" size="medium" aria-label="save" disabled={user.firstname.trim() === "" || user.lastname.trim() === "" || user.email.trim() === "" || user.password === '' || user.validuntil.trim() === "" || user.headquarter.trim() === "" || user.active === ""}>
                            <Save />
                        </Fab>
                    </Grid>
                    <Grid container item xs={6} sm={6} justifyContent={"left"}>
                        <Fab color="error" size="medium" aria-label="cancel" onClick={() => { handleCancel() }}>
                            <Cancel />
                        </Fab>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default UsersForm