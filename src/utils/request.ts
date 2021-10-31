import axios, { AxiosError } from 'axios';
import config from '../config';
import cogotoast from 'cogo-toast';
import { store } from '../redux/store';
const token = store.getState().auth.token;

const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: { contentType: 'application/json', appId: '1', token: token || '' },
    withCredentials: true,
    timeout: 5000,
});

axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

function onResponseSuccess(response: any) {
    if (response.data && response.data.messages) {
        response.data.messages.forEach((message: any) => {
            cogotoast.success(message.msg);
        });
    }
    return response.data;
}

function onResponseError(err: any) {
    const status = err.response ? err.response.status : 0;
    if (status !== 401 && err.response.data && err.response.data.errors) {
        // loop over errors and show cogo-toast error version
        err.response.data.errors.forEach((error: any) => {
            cogotoast.error(error.msg);
        });
    } else {
        cogotoast.error('Something went wrong, please try again later.');
    }
    return Promise.reject(err.response?.data);
}

export default axiosInstance;
