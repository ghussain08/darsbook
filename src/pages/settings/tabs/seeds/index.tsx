import { Grid } from '@mui/material';
import React from 'react';
import CreateSeedForm from './create-seed';
import SeedList from './seed-list';

export default function Seeds() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <CreateSeedForm />
            </Grid>
            <Grid item xs={12} md={6}>
                <SeedList />
            </Grid>
        </Grid>
    );
}
