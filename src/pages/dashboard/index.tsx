import React, { useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import request from '../../utils/request';
export default function Dashboard() {
    // on component mount, fetch data
    useEffect(() => {
        request({ method: 'GET', url: '/api/private/v1/test' }).then((data) => {
            console.log(data);
        });
    }, []);
    return <div>this is dashboard</div>;
}
