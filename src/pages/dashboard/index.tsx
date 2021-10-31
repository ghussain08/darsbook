import React, { ReactNode } from 'react';
import useAppSelector from '../../hooks/useAppSelector';

export default function Dashboard(): ReactNode {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.user);
    console.log(user, token);
    return (
        <div>
            this is dashboard
            {token}
            {JSON.stringify(user)}
        </div>
    );
}
