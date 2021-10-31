import axios from 'axios';
import config from '../config';
import cogotoast from 'cogo-toast';
import { store } from '../redux/store';
const user = store.getState().user;
const token = localStorage.getItem('token');
const conditionalHeaders: any = {};
if (token) {
    conditionalHeaders.Authorization = token;
}
if (user) {
    conditionalHeaders.uid = user.userId;
}
const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
        contentType: 'application/json',
        appId: '1',
        ...conditionalHeaders,
    },
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
    showErrorToasts(err);
    return Promise.reject(err.response?.data);
}

export default axiosInstance;

function showErrorToasts(err: any) {
    const status = err.response ? err.response.status : 0;
    if (status !== 401 && err.response.data && err.response.data.errors) {
        // loop over errors and show cogo-toast error version
        err.response.data.errors.forEach((error: any) => {
            cogotoast.error(error.msg);
        });
    } else if (status >= 500) {
        cogotoast.error('Unknown error occurred, please try again later');
    }
}
