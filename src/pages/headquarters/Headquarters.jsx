import { Fab, Grid, TextField } from "@mui/material"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
import { Add, Business } from "@mui/icons-material"
import { useEffect, useState } from "react"
import firestore from '../../util/firebase'
import { collection, getDocs, deleteDoc, doc, where, query } from "firebase/firestore"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import HeadquartersTable from "./HeadquartersTable"
import HeadquartersForm from "./HeadquartersForm"

const Headquarters = () => {
    const [headquarters, setHeadquarters] = useState([])
    const [headquarter, setHeadquarter] = useState(null)

    const [name, setName] = useState('')

    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(true)

    const MySwal = withReactContent(Swal)

    const getHeadquarters = async () => {
        setShow(true)
        setLoaded(false)
        const reference = collection(firestore, 'headquarters')
        const cursor = await getDocs(reference)
        const docs = cursor.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setHeadquarters(docs)
        setLoaded(docs.length > 0 ? true : false)
        setShow(docs.length > 0 ? true : false)
    }

    useEffect(() => {
        getHeadquarters()
    }, [])

    const handleAdd = () => {
        setHeadquarter({
            id: new Date().getTime().toString(),
            name: '',
            active: '',
            contact: {
                name: '',
                phone: '',
                email: ''
            },
            location: {
                city: '',
                address: '',
                zipcode: ''
            }
        })
    }

    const handleEdit = (headquarter) => {
        setHeadquarter(headquarter)
    }

    const handleDelete = (headquarter) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#0464ac',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#d33'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reference = collection(firestore, 'users')
                const filter = query(reference, where('headquarter', '==', headquarter.id))
                const cursor = await getDocs(filter)
                const docs = cursor.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                if (docs.length > 0) {
                    MySwal.fire({
                        title: 'Headquarter has users assigned!',
                        text: 'Please reassign users before deleting this headquarter.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#0464ac'
                    })
                    return
                }
                deleteDoc(doc(firestore, "headquarters", headquarter.id))
                    .then(() => {
                        MySwal.fire({
                            title: 'Deleted!',
                            text: 'Headquarter has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#0464ac'
                        })
                        getHeadquarters()
                    })
            }
        })
    }

    return (
        <>
            <Header title={"Headquarters"} />
            {!headquarter ?
                <>
                    <Grid container item xs={12} sm={4} sx={{ mb: 2 }} spacing={2} paddingX={1} justifyContent={"center"}>
                        {loaded &&
                            <Grid item xs={10}>
                                <TextField
                                    id="headquarter-search"
                                    name="headquarter-search"
                                    label="Search by name"
                                    fullWidth
                                    autoComplete="headquarter-search"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    variant="standard"
                                />
                            </Grid>
                        }
                        <Grid item xs={2}>
                            <Fab color="secondary" size="medium" onClick={() => { handleAdd() }} aria-label="add" sx={{ color: 'white' }}>
                                <Add />
                            </Fab>
                        </Grid>
                    </Grid>
                    {show &&
                        <>
                            {loaded ?
                                <HeadquartersTable
                                    headquarters={headquarters}
                                    name={name}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                                :
                                <Spinner Icon={Business} />
                            }
                        </>
                    }
                </>
                :
                <HeadquartersForm
                    headquarter={headquarter}
                    headquarters={headquarters}
                    setHeadquarter={setHeadquarter}
                    getHeadquarters={getHeadquarters}
                />
            }
        </>
    )
}

export default Headquarters