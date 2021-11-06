import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { Backdrop } from '@mui/material';
import { IUserState, setUser } from '../../app/features/user';
import fetchLoggedInUserDetails from './api';
import Loader from '../../sharable/loader';
export default function CheckAuth(props: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.user);
    const [isLoading, setLoader] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchLoggedInUserDetails()
            .then((response: any) => {
                dispatch(setUser(response.data.user as IUserState));
                setLoader(false);
            })
            .catch((err) => {
                setLoader(false);
            });
    }, [dispatch]);
    if (isLoading) {
        return (
            <Backdrop sx={{ backgroundColor: 'white' }} open={true}>
                <Loader isOpen={true} />
            </Backdrop>
        );
    }
    if (user) {
        return props.children;
    }
    localStorage.clear();
    return <Redirect to="/login" />;
}
