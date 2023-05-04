import { collection, getDocs, query, where } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import firestore from "../../util/firebase"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { Business, Check, Close } from "@mui/icons-material"
import Header from "../../components/Header"
import { Grid, Typography } from "@mui/material"
import UsersTable from "../users/UsersTable"

const HeadquartersReview = () => {
    const { id } = useParams()

    const [headquarter, setHeadquarter] = useState({})
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const getHeadquarter = async () => {
        const reference = collection(firestore, "headquarters")
        const filter = query(reference, where("id", "==", id))
        const cursor = await getDocs(filter)
        const docs = cursor.docs.map(doc => doc.data())
        if (docs.length > 0) {
            getUsers()
            setShow(true)
            setHeadquarter(docs[0])
        } else {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nothing to show here!",
                confirmButtonText: "Go back",
                confirmButtonColor: "#0464ac"
            }).then(() => {
                navigate("/")
            })
        }
    }

    const getUsers = async () => {
        const reference = collection(firestore, "users")
        const filter = query(reference, where("headquarter", "==", id))
        const cursor = await getDocs(filter)
        const docs = cursor.docs.map(doc => doc.data())
        setUsers(docs)
    }

    useEffect(() => {
        getHeadquarter()
    }, [])

    return (
        <>
            {show ?
                <>
                    <Header title={headquarter.name} />
                    <Grid container item xs={12} sm={12} paddingX={1}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>Contact</Typography>
                            <Typography gutterBottom>{headquarter.contact.name}</Typography>
                            <Typography gutterBottom>{headquarter.contact.phone}</Typography>
                            <Typography gutterBottom>{headquarter.contact.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>Location</Typography>
                            <Typography gutterBottom>{headquarter.location.address.concat(", ", headquarter.location.city, ", ", headquarter.location.zipcode)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>Active</Typography>
                            <Typography gutterBottom>{headquarter.active ? <Check color="secondary" /> : <Close color="error" />}</Typography>
                        </Grid>
                        {users.length > 0 &&
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>Users</Typography>
                                <UsersTable
                                    users={users}
                                    name={''}
                                    headquarter={''}
                                    headquarters={[headquarter]}
                                    review={true}
                                />
                            </Grid>
                        }
                    </Grid>
                </>
                :
                <Spinner Icon={Business} />
            }
        </>
    )
}

export default HeadquartersReview