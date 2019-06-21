import request from '@/utils/request';
import SERVICES from '../../config/serviceConfig';

export async function login(payload) {
    return request.post(`${SERVICES.domain}/admin/login`, { params: payload, requestType: 'json' });
}