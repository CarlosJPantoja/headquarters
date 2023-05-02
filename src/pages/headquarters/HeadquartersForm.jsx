import { Grid, TextField, Stack, Button, Box, MenuItem } from "@mui/material"
import { doc, setDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Header from "../../components/Header"
import firestore from "../../util/firebase"

const HeadquartersForm = ({ headquarter, setHeadquarter, update, getHeadquarters }) => {

    const MySwal = withReactContent(Swal)

    const handleSave = (event) => {
        event.preventDefault()
        setDoc(doc(firestore, "headquarters", headquarter.id), headquarter)
            .then(() => {
                getHeadquarters()
                setHeadquarter(null)
            })
    }

    const handleCancel = () => {
        setHeadquarter(null)
    }

    return (
        <>
            <Header title={update ? "Edit headquarter" : "Create headquarter"} />
            <Box component="form" noValidate onSubmit={handleSave}>
                <Grid container item spacing={3} xs={10} justifyContent={"center"} sx={{ mb: 2 }}>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <TextField
                            required
                            select
                            id="active"
                            name="active"
                            label="Active"
                            fullWidth
                            autoComplete="active"
                            variant="standard"
                            defaultValue={headquarter.active}
                            onChange={(event) => setHeadquarter({ ...headquarter, active: event.target.value })}
                            SelectProps={{
                                style: { textAlign: 'left' }
                            }}
                        >
                            <MenuItem key={0} value={false}>
                                False
                            </MenuItem>
                            <MenuItem key={1} value={true}>
                                True
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                </Grid>
                <Stack direction="row" spacing={1} justifyContent={"center"}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ color: "white" }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel()}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default HeadquartersForm