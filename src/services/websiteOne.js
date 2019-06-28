import request from '@/utils/request';
import SERVICES from '../../config/serviceConfig';
import { message as Message } from 'antd';
import _ from 'lodash';
import { async } from 'q';

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

export async function fetchModuleList() {
    return request.get(`${SERVICES.domain}/admin/lyf/type/lists`, { headers: { Authorization: `${SERVICES.token}` } });
}

export async function deleteModuleById(payload) {
    const { id } = payload;
    return request.post(`${SERVICES.domain}/admin/lyf/type/delete/${id}`, { headers: { Authorization: `${SERVICES.token}` } });
}

export async function moduleInfoSubmit(payload) {
    const { id, params } = payload;
    return request.post(`${SERVICES.domain}/admin/lyf/type/${id}`, { headers: { Authorization: `${SERVICES.token}` }, params: params });
}

export async function addModule(payload) {
    return request.post(`${SERVICES.domain}/admin/lyf/type/store`, { headers: { Authorization: `${SERVICES.token}` }, params: payload, requestType: 'json' });
}

export async function removeWebsite(payload) {
    const { id } = payload;
    return request.post(`${SERVICES.domain}/admin/lyf/website/delete/${id}`, { headers: { Authorization: `${SERVICES.token}` } });
}

export async function addWebsite(payload) {
    return request.post(`${SERVICES.domain}/admin/lyf/website/store`, { headers: { Authorization: `${SERVICES.token}` }, params: payload, requestType: 'json' });
}

export async function modifyWebsite(payload) {
    const { id, params } = payload;
    return request.post(`${SERVICES.domain}/admin/lyf/website/${id}`, { headers: { Authorization: `${SERVICES.token}` }, params: params, requestType: 'json' });
}

function fetchWrapper(url, formData, onSuccess, onError) {
    let fullUrl = `${SERVICES.domain}${url}`;
    let header = { Accept: 'application/json', Authorization: `${SERVICES.token}` };
    let obj = { method: 'POST', headers: header, body: formData };
    fetch(fullUrl, obj).then((response) => response.json())
        .then((reponseJson) => {
            const result = reponseJson.result ? reponseJson.result : null;
            const code = (reponseJson.code || reponseJson.code === 0) ? reponseJson.code : 0;
            const messageInfo = reponseJson.message ? reponseJson.message : null;
            try {
                if (code === 1) {
                    onSuccess(result, code, messageInfo);
                } else {
                    Message.error(messageInfo);
                }
            } catch (error) {
                onError ? onError(result, code, messageInfo) : Message.error(`error:__${error}`);
            }
        });
}


export function uploadPic(file, onSuccess, onError) {
    let formData = new FormData();
    formData.append('image', file);
    fetchWrapper('/admin/lyf/ad/upload', formData, onSuccess, onError);
}

export function addAd(payload, onSuccess, onError) {
    let formData = new FormData();
    formData.append('ad_image_path', payload.imageUrl);
    formData.append('href', payload.adLink);
    formData.append('sort', payload.sortNum);
    formData.append('status', payload.status);
    fetchWrapper('/admin/lyf/ad/store', formData, onSuccess, onError);
}

export function modifyAd(payload, onSuccess, onError) {
    let url = `/admin/lyf/ad/${payload.Id}`;
    let imageUrlWithoutDomain = _.replace(payload.imageUrl, `${SERVICES.domain}/storage/`, '');
    let formData = new FormData();
    formData.append('ad_image_path', imageUrlWithoutDomain);
    formData.append('href', payload.adLink);
    formData.append('sort', payload.sortNum);
    formData.append('status', payload.status);
    fetchWrapper(url, formData, onSuccess, onError);
}

export function deleteAd(id, onSuccess, onError) {
    let url = `/admin/lyf/ad/delete/${id}`;
    let formData = new FormData();
    fetchWrapper(url, formData, onSuccess, onError);
}

export function submitModuleInfo(id, params, onSuccess, onError) {
    let url = `/admin/lyf/type/${id}`;
    let formData = new FormData();
    formData.append('title', params.title);
    formData.append('intro', params.intro);
    formData.append('status', params.status);
    formData.append('sort', params.sort);
    fetchWrapper(url, formData, onSuccess, onError);
}

export function modifyWebsiteSubmit(id, params, onSuccess, onError) {
    let url = `/admin/lyf/website/${id}`;
    let formData = new FormData();
    formData.append('type_id', params.type_id);
    formData.append('title', params.title);
    formData.append('href', params.href);
    formData.append('status', params.status);
    formData.append('sort', params.sort);
    fetchWrapper(url, formData, onSuccess, onError);
}