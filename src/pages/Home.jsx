import { Typography } from "@mui/material"
import Header from "../components/Header"
import headquarters from '../assets/headquarters.jpg'

const Home = () => {
    return (
        <>
            <Header title="Welcome" />
            <Typography variant="h6" sx={{ mb: 2 }}>
                Here you can manage the application headquarters and their users
            </Typography>
            <img src={headquarters} width={'35%'} />
        </>
    )
}

export default Home