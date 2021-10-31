import IVerifyEmailPayload from '../../types/verify-email/verify-email.types';
import request from '../../utils/request';

export const verifyEmail = (payload: IVerifyEmailPayload) => {
    return request({
        method: 'POST',
        url: '/api/public/v1/signup/verify-email',
        data: payload,
    });
};

export const resendEmailVerificationOTP = (payload: { email: string }) => {
    return request({
        method: 'POST',
        url: '/api/public/v1/signup/resend-otp',
        data: payload,
    });
};
