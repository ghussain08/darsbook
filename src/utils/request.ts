import axios from 'axios';
import config from '../config';
import cogotoast from 'cogo-toast';

const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
        contentType: 'application/json',
        appId: '1',
    },
    withCredentials: true,
    timeout: 5000,
});

let refreshTokenReq: any;
function getRefreshTokenReq() {
    if (refreshTokenReq) {
        return refreshTokenReq;
    }
    refreshTokenReq = initiateRefreshToken();
    return refreshTokenReq;
}

// attach auth token for every request
axiosInstance.interceptors.request.use((req: any) => {
    const token = localStorage.getItem('token');
    req.headers.Authorization = token;
    return req;
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
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        return handle401Error(err);
    }
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

// create a method which will make a api call to refresh jwt token
export async function initiateRefreshToken() {
    return axios({
        method: 'post',
        url: `${config.baseUrl}/api/public/v1/refresh-token`,
        withCredentials: true,
        headers: { appId: '1', contentType: 'application/json' },
    });
}

function handle401Error(err: any) {
    return getRefreshTokenReq()
        .then((res: any) => {
            localStorage.setItem('token', res.data.data.token);
            err.config.__isRetryRequest = true;
            err.config.headers.Authorization = res.data.data.token;
            return axiosInstance(err.config);
        })
        .catch((err: any) => {
            localStorage.removeItem('token');
            window.location.href = '/login';
            console.log(err);
        });
}
