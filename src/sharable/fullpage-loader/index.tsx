import { Backdrop, Box } from "@mui/material";
import Loader from "../loader";

export default function FullPageLoader(props: { message?: string; isOpen: boolean }) {
    if (!props.isOpen) {
        return null;
    }
    return (
        <Backdrop open={true} sx={{ zIndex: 1000 }}>
            <Box bgcolor={"white"} borderRadius={"5px"} textAlign={"center"} py={4} px={10}>
                <Loader isOpen={true} />
            </Box>
        </Backdrop>
    );
}
