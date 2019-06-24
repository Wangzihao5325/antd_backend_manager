import request from '@/utils/request';
import SERVICES from '../../config/serviceConfig';

export async function fetchWebsiteOneGlobalConfig() {
    return request.get(`${SERVICES.domain}/admin/lyf/config`, { headers: { Authorization: `${SERVICES.token}` } });
}

export async function updateWebsiteOneGlobalConfig(payload) {
    const { globalConfig } = payload;
    return request.post(`${SERVICES.domain}/admin/lyf/config`, { headers: { Authorization: `${SERVICES.token}` }, params: globalConfig, requestType: 'json' });
}

export async function fetchWebsiteOneAdList(payload) {
    return request.get(`${SERVICES.domain}/admin/lyf/ad/lists`, { headers: { Authorization: `${SERVICES.token}` }, params: payload, requestType: 'json' });
}