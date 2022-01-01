import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../sidebar";
import { colors } from "@mui/material";
const drawerWidth = 250;

function ResponsiveDrawer(props: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerCloseOnMobile = () => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    };

    const drawer = <Sidebar />;

    const container = undefined;
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                color="inherit"
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: "1px solid ghostwhite",
                    zIndex: 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileOpen(true)}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 1 }}
                aria-label="mailbox folders"
                onClick={handleDrawerCloseOnMobile}
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    // ModalProps={{
                    //     keepMounted: true, // Better open performance on mobile.
                    // }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box bgcolor={colors.grey[100]} component="main" sx={{ flexGrow: 1, p: 2, minHeight: "100vh" }} mt="57px">
                {props.children}
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;
