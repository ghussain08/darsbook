import axios, { AxiosError, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import config from '../config';
const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: { contentType: 'application/json', appId: '1' },
    timeout: 5000,
});

axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

function onResponseSuccess(response: AxiosResponse) {
    return response.data;
}

function onResponseError(err: AxiosError) {
    return Promise.reject(err.response?.data);
}

export default axiosInstance;
