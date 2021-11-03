import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Dashboard, Receipt } from '@mui/icons-material';
export default function Menu() {
    return (
        <Box py={3}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
            </List>
        </Box>
    );
}
