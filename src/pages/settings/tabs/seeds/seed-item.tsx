import React from 'react';
import { ISeed } from '../../../../app/features/seeds';
import { ListItemText, ListItem, Button, CircularProgress } from '@mui/material';
import ConfirmationDialog from '../../../../sharable/confirmation';
import { useRemoveSeedMutation } from '../../../../app/features/seeds';
export default function SeedItem(props: { seed: ISeed }) {
    const [removeSeed, { isLoading }] = useRemoveSeedMutation();

    const [isOpen, setIsOpen] = React.useState(false);
    const { seed } = props;
    const removeSeedHandler = async () => {
        try {
            setIsOpen(false);
            await removeSeed({ id: seed.seedId, status: seed.isActive ? 0 : 1 });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <React.Fragment>
            <ConfirmationDialog
                open={isOpen}
                title="Remove seed"
                content="Are you sure you want to disable the seed, Order created using this seed will not be affected and you can enable it back whenever you want"
                onConfirm={removeSeedHandler}
                onCancel={() => setIsOpen(false)}
            />

            <ListItem disableGutters>
                <ListItemText
                    primary={`${seed.seedName} ${!seed.isActive ? `(Inactive)` : ''}`}
                    secondary={new Date(seed.createdOn).toLocaleString()}
                />
                <Button
                    disabled={isLoading}
                    endIcon={isLoading ? <CircularProgress size={20} /> : null}
                    onClick={!seed.isActive ? removeSeedHandler : () => setIsOpen(true)}
                    color={seed.isActive ? 'error' : 'success'}
                >
                    {seed.isActive ? 'Disable' : 'Enable'}
                </Button>
            </ListItem>
        </React.Fragment>
    );
}
