import { CircularProgress } from '@mui/material';
import React from 'react';
export default function Loader(props: { size?: number; thickness?: number; isOpen: boolean }) {
    if (!props.isOpen) {
        return null;
    }
    return <CircularProgress size={props.size || '30px'} thickness={props.thickness || 8} />;
}
