import request from '../../utils/request';

export const handleLogin = (payload: any) => {
    return request({
        method: 'POST',
        url: '/api/public/v1/login',
        data: payload,
    });
};
