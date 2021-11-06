import React from 'react';
import { useGetUserSeedsQuery } from '../../../../app/features/seeds';
import { Card, List, CardContent, CardHeader } from '@mui/material';
import Loader from '../../../../sharable/loader';
import Empty from '../../../../sharable/empty';
import SeedItem from './seed-item';

export default function SeedList() {
    const { data, isLoading } = useGetUserSeedsQuery();
    return (
        <Card variant="outlined">
            <CardHeader title="Seed List" subheader="" />
            <CardContent>
                <Loader isOpen={isLoading} />
                <Empty
                    isOpen={!data || data.seeds.length === 0}
                    message="Currently seed list is empty, please add new seeds"
                />
                <List sx={{ margin: 0 }}>
                    {data?.seeds.map((seed, index) => (
                        <SeedItem seed={seed} key={index} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
