import React, { useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import request from '../../utils/request';
export default function Dashboard() {
    // on component mount, fetch data
    useEffect(() => {
        request({ method: 'GET', url: `/api/private/v1/test?requestId=${randomString()}` })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('error reported');
            });
    }, []);

    // generate random string
    const randomString = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    useEffect(() => {
        request({
            method: 'GET',
            url: `/api/private/v1/test?requestId=${randomString()}`,
            data: { requestId: randomString() },
        })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('error reported');
            });
    }, []);

    return <div>this is dashboard</div>;
}
