import { Check, Close, Delete, Edit } from "@mui/icons-material"
import { Fab, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const HeadquartersTable = ({ headquarters, name, handleEdit, handleDelete }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell rowSpan={2} align="center">Name</TableCell>
                        <TableCell colSpan={3} align="center">Contact</TableCell>
                        <TableCell colSpan={3} align="center">Location</TableCell>
                        <TableCell rowSpan={2} align="center">Active</TableCell>
                        <TableCell colSpan={2} rowSpan={2} align="center">Actions</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Zip Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {headquarters.filter((headquarter) => name == '' || headquarter.name.toLowerCase().includes(name.toLowerCase()))
                    .map((headquarter) => (
                        <TableRow key={headquarter.id}>
                            <TableCell align="center">
                                <Link style={{ color: '#0464ac' }} component={RouterLink} to={`/${headquarter.id}`}>
                                    {headquarter.name}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{headquarter.contact.name}</TableCell>
                            <TableCell align="center">{headquarter.contact.phone}</TableCell>
                            <TableCell align="center">{headquarter.contact.email}</TableCell>
                            <TableCell align="center">{headquarter.location.city}</TableCell>
                            <TableCell align="center">{headquarter.location.address}</TableCell>
                            <TableCell align="center">{headquarter.location.zipcode}</TableCell>
                            <TableCell align="center">{headquarter.active ? <Check color="secondary" /> : <Close color="error"/>}</TableCell>
                            <TableCell align="center">
                                <Fab color="primary" size="medium" onClick={() => { handleEdit(headquarter) }} aria-label="edit" sx={{ color: 'white' }}>
                                    <Edit />
                                </Fab>
                            </TableCell>
                            <TableCell align="center">
                                <Fab color="error" size="medium" onClick={() => { handleDelete(headquarter) }} aria-label="delete" sx={{ color: 'white' }}>
                                    <Delete />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default HeadquartersTable