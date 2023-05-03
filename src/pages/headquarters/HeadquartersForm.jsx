import { Grid, TextField, Box, MenuItem, Fab } from "@mui/material"
import { doc, setDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import firestore from "../../util/firebase"
import { Cancel, Check, Close, Save } from "@mui/icons-material"

const HeadquartersForm = ({ headquarter, headquarters, setHeadquarter, getHeadquarters }) => {

    const MySwal = withReactContent(Swal)

    const handleSave = (event) => {
        event.preventDefault()
        if (headquarters.filter(h => h.id !== headquarter.id).filter(h => h.name.trim().toLowerCase() === headquarter.name.trim().toLowerCase()).length > 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Error saving headquarter',
                text: 'There is already a headquarter with that name',
                confirmButtonText: 'Try again',
                confirmButtonColor: '#0464ac'
            })
            return
        }
        MySwal.fire({
            title: 'Headquarter saved!',
            text: "You can see it in the table below.",
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0464ac'
        })
        setDoc(doc(firestore, "headquarters", headquarter.id), headquarter)
            .then(() => {
                setHeadquarter(null)
                getHeadquarters()
            })
    }

    const handleCancel = () => {
        setHeadquarter(null)
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSave}>
                <Grid container item spacing={3} xs={12} sm={12} paddingX={1}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="headquarter-name"
                            name="headquarter-name"
                            label="Name"
                            fullWidth
                            autoComplete="headquarter-name"
                            variant="standard"
                            defaultValue={headquarter.name}
                            onChange={(event) => setHeadquarter({ ...headquarter, name: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            select
                            id="active"
                            name="active"
                            label="Active"
                            fullWidth
                            autoComplete="active"
                            variant="standard"
                            value={headquarter.active}
                            onChange={(event) => setHeadquarter({ ...headquarter, active: event.target.value })}
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-contact-name"
                            name="headquarter-contact-name"
                            label="Contact name"
                            fullWidth
                            autoComplete="headquarter-contact-name"
                            variant="standard"
                            defaultValue={headquarter.contact.name}
                            onChange={(event) => setHeadquarter({ ...headquarter, contact: { ...headquarter.contact, name: event.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-contact-phone"
                            name="headquarter-contact-phone"
                            label="Contact phone"
                            fullWidth
                            autoComplete="headquarter-contact-phone"
                            variant="standard"
                            defaultValue={headquarter.contact.phone}
                            onChange={(event) => setHeadquarter({ ...headquarter, contact: { ...headquarter.contact, phone: event.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-contact-email"
                            name="headquarter-contact-email"
                            label="Contact email"
                            fullWidth
                            autoComplete="headquarter-contact-email"
                            variant="standard"
                            defaultValue={headquarter.contact.email}
                            onChange={(event) => setHeadquarter({ ...headquarter, contact: { ...headquarter.contact, email: event.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-location-city"
                            name="headquarter-location-city"
                            label="City"
                            fullWidth
                            autoComplete="headquarter-location-city"
                            variant="standard"
                            defaultValue={headquarter.location.city}
                            onChange={(event) => setHeadquarter({ ...headquarter, location: { ...headquarter.location, city: event.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-location-address"
                            name="headquarter-location-address"
                            label="Address"
                            fullWidth
                            autoComplete="headquarter-location-address"
                            variant="standard"
                            defaultValue={headquarter.location.address}
                            onChange={(event) => setHeadquarter({ ...headquarter, location: { ...headquarter.location, address: event.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="headquarter-location-zip-code"
                            name="headquarter-location-zip-code"
                            label="Zip Code"
                            fullWidth
                            autoComplete="headquarter-location-zipcode"
                            variant="standard"
                            defaultValue={headquarter.location.zipcode}
                            onChange={(event) => setHeadquarter({ ...headquarter, location: { ...headquarter.location, zipcode: event.target.value } })}
                        />
                    </Grid>
                    <Grid container item xs={6} sm={6} justifyContent={"right"}>
                        <Fab type="submit" color="primary" size="medium" aria-label="save" disabled={headquarter.name.trim() === "" || headquarter.contact.name.trim() === "" || headquarter.contact.phone.trim() === "" || headquarter.contact.email.trim() === "" || headquarter.location.city.trim() === "" || headquarter.location.address.trim() === "" || headquarter.location.zipcode.trim() === ""}>
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

export default HeadquartersForm