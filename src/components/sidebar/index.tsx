import BrandName from "./brand-name";
import { Box } from "@mui/material";
import Menu from "./menu";
export default function Sidebar() {
    return (
        <Box p={2}>
            <BrandName />
            <Menu />
        </Box>
    );
}
