import Header from "../../components/Header";
import { Fab, Grid, TextField } from "@mui/material";
import { Add, PeopleAlt } from "@mui/icons-material";
import firestore from "../../util/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import UsersTable from "./UsersTable";
import Spinner from "../../components/Spinner";
import UsersForm from "./UsersForm";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [headquarters, setHeadquarters] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    const [name, setName] = useState('')
    const [headquarter, setHeadquarter] = useState('')

    const [edit , setEdit] = useState(false)

    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(true)

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const getHeadquarters = async () => {
        const reference = collection(firestore, 'headquarters')
        const cursor = await getDocs(reference)
        const docs = cursor.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setHeadquarters(docs)
        if (docs.length > 0) {
            getUsers()
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'No headquarters',
                text: 'You must create at least one headquarters to create users.',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#0464ac'
            }).then(() => {
                navigate('/')
            })
        }
    }

    const getUsers = async () => {
        setShow(true)
        setLoaded(false)
        const reference = collection(firestore, 'users')
        const cursor = await getDocs(reference)
        const docs = cursor.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setUsers(docs)
        setLoaded(docs.length > 0 ? true : false)
        setShow(docs.length > 0 ? true : false)
    }

    useEffect(() => {
        getHeadquarters()
    }, [])

    const handleAdd = () => {
        setEdit(false)
        setUser({
            id: new Date().getTime().toString(),
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            validuntil: '',
            active: '',
            headquarter: ''
        })
    }

    const handleEdit = (user) => {
        setEdit(true)
        setUser(user)
    }

    const handleDelete = (user) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#0464ac',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(firestore, "users", user.id))
                    .then(() => {
                        MySwal.fire({
                            title: 'Deleted!',
                            text: 'User has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#0464ac'
                        })
                        getUsers()
                    })
            }
        })
    }

    return (
        <>
            <Header title={"Users"} />
            {!user ?
                <>
                    <Grid container item xs={12} sm={6} sx={{ mb: show ? 2 : 0 }} spacing={2} paddingX={1} justifyContent={"center"}>
                        {loaded &&
                            <>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        id="user-search-by-name"
                                        name="user-search-by-name"
                                        label="Search by name"
                                        fullWidth
                                        autoComplete="user-search-by-name"
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        id="user-search-by-headquarter"
                                        name="user-search-by-headquarter"
                                        label="Search by headquarter"
                                        fullWidth
                                        autoComplete="user-search-by-headquarter"
                                        variant="standard"
                                        onChange={(e) => setHeadquarter(e.target.value)}
                                        value={headquarter}
                                    />
                                </Grid>
                            </>
                        }
                        <Grid item xs={12} sm={2}>
                            <Fab color="secondary" size="medium" onClick={() => { handleAdd() }} aria-label="add" sx={{ color: 'white' }}>
                                <Add />
                            </Fab>
                        </Grid>
                    </Grid>
                    {show &&
                        <>
                            {loaded ?
                                <UsersTable
                                    users={users}
                                    headquarters={headquarters}
                                    name={name}
                                    headquarter={headquarter}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                                :
                                <Spinner Icon={PeopleAlt} />
                            }
                        </>
                    }
                </>
                :
                <UsersForm
                    user={user}
                    users={users}
                    edit={edit}
                    headquarters={headquarters}
                    setUser={setUser}
                    getHeadquarters={getHeadquarters}
                />
            }
        </>
    )
}

export default Users