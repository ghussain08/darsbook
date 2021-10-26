import { ISignupPayload } from '../../types/signup/signup.types';
import request from '../../utils/request';

export const handleSignup = (payload: ISignupPayload) => {
    return request({
        method: 'POST',
        url: '/api/public/v1/signup',
        data: payload,
    });
};
