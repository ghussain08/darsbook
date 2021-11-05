import request from '../../utils/request';

export default function fetchLoggedUserDetails() {
    return request({ method: 'GET', url: '/api/private/v1/user' });
}
