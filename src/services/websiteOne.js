import request from '@/utils/request';
import SERVICES from '../../config/serviceConfig';

export async function fetchWebsiteOneGlobalConfig(payload) {
    return request.get(`${SERVICES.domain}/admin/lyf/config`, { params: payload, requestType: 'json' });
}