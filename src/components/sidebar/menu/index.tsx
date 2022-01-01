import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box, Icon } from "@mui/material";
import { Dashboard, Logout, Receipt } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import menuItems from "./menu-items";
import { useTheme } from "@mui/material";

export default function Menu() {
    const theme = useTheme();
    return (
        <Box
            pt={6}
            sx={{ minHeight: "calc(100vh - 150px)" }}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
        >
            <List>
                {menuItems.map((menu, index) => {
                    const MenuIcon = menu.icon;
                    return (
                        <ListItem
                            key={index}
                            button
                            activeStyle={{
                                fontWeight: "bold",
                                borderRight: `2px solid ${theme.palette.primary.main}`,
                                marginBottom: "5px",
                                color: theme.palette.primary.main,
                            }}
                            component={NavLink}
                            exact
                            to={menu.to}
                        >
                            <ListItemIcon sx={{ color: "inherit" }}>
                                <Icon>
                                    <MenuIcon />
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary={menu.name} />
                        </ListItem>
                    );
                })}
            </List>
            <List>
                <ListItem
                    button
                    activeStyle={{
                        fontWeight: "bold",
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        marginBottom: "5px",
                        color: theme.palette.primary.main,
                    }}
                    component={NavLink}
                    exact
                    to={"/logout"}
                >
                    <ListItemIcon sx={{ color: "inherit" }}>
                        <Icon>
                            <Logout />
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );
}
