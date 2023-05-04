import { Check, Close, Delete, Edit } from "@mui/icons-material"
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const date = new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
})

const UsersTable = ({ users, headquarters, name, headquarter, handleEdit, handleDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Password</TableCell>
                        <TableCell align="center">Headquarter</TableCell>
                        <TableCell align="center">Valid until</TableCell>
                        <TableCell align="center">Active</TableCell>
                        <TableCell align="center" colSpan={2}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.filter((user) => name == '' || user.firstname.trim().toLowerCase().concat(' ', user.lastname.trim().toLowerCase()).includes(name.toLowerCase()))
                    .filter((user) => headquarter == '' || headquarters.find(headquarter => headquarter.id === user.headquarter).name.toLowerCase().includes(headquarter.toLowerCase()))
                    .map((user) => (
                        <TableRow key={user.id}>
                            <TableCell align="center">{user.firstname.trim().concat(' ', user.lastname.trim())}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.password.substring(0, 10).concat('...')}</TableCell>
                            <TableCell align="center">{headquarters.find(headquarter => headquarter.id === user.headquarter).name}</TableCell>
                            <TableCell align="center">{date.format(new Date(user.validuntil + 'T00:00:00-05:00'))}</TableCell>
                            <TableCell align="center">{user.active ? <Check color="secondary" /> : <Close color="error"/>}</TableCell>
                            <TableCell align="center">
                                <Fab color="primary" size="medium" onClick={() => { handleEdit(user) }} aria-label="edit" sx={{ color: 'white' }}>
                                    <Edit />
                                </Fab>
                            </TableCell>
                            <TableCell align="center">
                                <Fab color="error" size="medium" onClick={() => { handleDelete(user) }} aria-label="delete" sx={{ color: 'white' }}>
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

export default UsersTable