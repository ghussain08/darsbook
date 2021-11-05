import { Box } from '@mui/material';
import Logo from '../../../static/full.svg';
export default function AdminCard() {
    return (
        <Box pb={1}>
            <img style={{ maxWidth: '100%' }} alt="logo" src={Logo} />
        </Box>
    );
}
