import { Delete, Edit } from "@mui/icons-material"
import { Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const HeadquartersTable = ({ headquarters, handleEdit, handleDelete }) => {
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
                    {headquarters.map((headquarter) => (
                        <TableRow key={headquarter.id}>
                            <TableCell align="center">{headquarter.name}</TableCell>
                            <TableCell align="center">{headquarter.contact.name}</TableCell>
                            <TableCell align="center">{headquarter.contact.phone}</TableCell>
                            <TableCell align="center">{headquarter.contact.email}</TableCell>
                            <TableCell align="center">{headquarter.location.city}</TableCell>
                            <TableCell align="center">{headquarter.location.address}</TableCell>
                            <TableCell align="center">{headquarter.location.zipcode}</TableCell>
                            <TableCell align="center">{headquarter.active ? 'True' : 'False'}</TableCell>
                            <TableCell align="center">
                                <Fab color="primary" size="medium" onClick={() => { handleEdit(headquarter) }} aria-label="add" sx={{ color: 'white' }}>
                                    <Edit />
                                </Fab>
                            </TableCell>
                            <TableCell align="center">
                                <Fab color="error" size="medium" onClick={() => { handleDelete(headquarter) }} aria-label="add" sx={{ color: 'white' }}>
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