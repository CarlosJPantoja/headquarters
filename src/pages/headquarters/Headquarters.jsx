import { Fab } from "@mui/material"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
import { Add, Business } from "@mui/icons-material"
import { useEffect, useState } from "react"
import firestore from '../../util/firebase'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import HeadquartersTable from "./HeadquartersTable"
import HeadquartersForm from "./HeadquartersForm"

const Headquarters = () => {
    const [headquarters, setHeadquarters] = useState([])
    const [headquarter, setHeadquarter] = useState(null)
    const [update, setUpdate] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(true)

    const getHeadquarters = async () => {
        const reference = collection(firestore, 'headquarters')
        const cursor = await getDocs(reference)
        const headquarters = cursor.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setHeadquarters(headquarters)
        setLoaded(headquarters.length > 0 ? true : false)
        setShow(headquarters.length > 0 ? true : false)
    }

    useEffect(() => {
        getHeadquarters()
    }, [])

    const handleAdd = () => {
        setUpdate(false)
        setHeadquarter({
            id: new Date().getTime().toString(),
            name: '',
            active: true,
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

    const handleUpdate = (headquarter) => {
        setUpdate(true)
        setHeadquarter(headquarter)
    }

    const handleDelete = (headquarter) => {
        deleteDoc(doc(firestore, "headquarters", headquarter.id))
            .then(() => {
                getHeadquarters()
            })
    }

    return (
        <>
            {!headquarter ?
                <>
                    <Header title="Headquarters" />
                    <Fab color="secondary" size="medium" onClick={() => { handleAdd() }} aria-label="add" sx={{ color: 'white' , mb: show ? 2 : 0 }}>
                        <Add />
                    </Fab>
                    {show &&
                        <>
                            {loaded ?
                                <HeadquartersTable
                                    headquarters={headquarters}
                                    handleEdit={handleUpdate}
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
                    setHeadquarter={setHeadquarter}
                    update={update}
                    getHeadquarters={getHeadquarters}
                />
            }
        </>
    )
}

export default Headquarters