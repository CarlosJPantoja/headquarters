import { Business, Home } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/headquarters">
                <ListItemIcon>
                    <Business />
                </ListItemIcon>
                <ListItemText primary="Headquarters" />
            </ListItemButton>
        </>
    )
}