import request from '@/utils/request';
import SERVICES from '../../config/serviceConfig';

export async function fetchWebsiteOneGlobalConfig() {
    return request.get(`${SERVICES.domain}/admin/lyf/config`, { headers: { Authorization: `${SERVICES.token}` } });
}