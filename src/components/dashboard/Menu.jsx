import { Business, PeopleAlt } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <ListItemButton component={Link} to="/users">
                <ListItemIcon>
                    <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <Business />
                </ListItemIcon>
                <ListItemText primary="Headquarters" />
            </ListItemButton>
        </>
    )
}