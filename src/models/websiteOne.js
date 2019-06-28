import { queryCurrent, query as queryUsers } from '@/services/websiteOne';
import {
    fetchWebsiteOneGlobalConfig,
    updateWebsiteOneGlobalConfig,
    fetchWebsiteOneAdList,
    fetchModuleList,
    deleteModuleById,
    moduleInfoSubmit,
    addModule,
} from '@/services/websiteOne';
import { message as Message } from 'antd';

const Model = {
    namespace: 'websiteOne',
    state: {
        webSiteGlobalConfig: {},
        adlist: [],
        modulelist: []
    },
    effects: {
        *getGlobalConfig(_, { call, put }) {
            const response = yield call(fetchWebsiteOneGlobalConfig);
            const { code, message, result } = response;
            if (code === 1) {
                const globalConfigReg = {
                    main_url: result.FOREVER_URL ? result.FOREVER_URL : '',
                    new_url: result.NEW_WEBSITE_URL ? result.NEW_WEBSITE_URL : '',
                    meta_description: result.META_DESCRIPTION ? result.META_DESCRIPTION : '',
                    meta_keywords: result.META_KEYWORDS ? result.META_KEYWORDS : '',
                    web_title: result.WEB_TITLE ? result.WEB_TITLE : '',
                };
                yield put({
                    type: 'updateGlobalConfig',
                    payload: {
                        webSiteGlobalConfig: globalConfigReg
                    },
                });
            } else {
                Message.error(message);
            }
        },
        *submitGlobalConfig({ payload }, { call, put }) {
            const response = yield call(updateWebsiteOneGlobalConfig, payload);
            if (response.code === 1) {
                Message.success('提交成功');
                yield put({
                    type: 'getGlobalConfig'
                });
            } else {
                Message.error('提交失败，请联系后台管理员！');
            }
        },
        *getAdList({ payload }, { call, put }) {
            const response = yield call(fetchWebsiteOneAdList, payload);
            let { data } = response.result;
            yield put({
                type: 'pushAdListItem',
                payload: {
                    data: data
                }
            });
        },
        *getModuleList(_, { call, put }) {
            const response = yield call(fetchModuleList);
            console.log(response);
            let moduleData = response.result.data;
            yield put({
                type: 'updateModuleData',
                payload: {
                    data: moduleData
                }
            });
        },
        *deleteModuleById({ payload }, { call, put }) {
            const response = yield call(deleteModuleById, payload);
            if (response.code === 1) {
                Message.destroy();
                Message.success('删除成功,正在更新数据...');
                yield put({
                    type: 'getModuleList'
                });
            } else {
                Message.error('删除失败，请联系后台管理员！');
            }
        },
        *modifyModuleInfo({ payload }, { call, put }) {
            const response = yield call(moduleInfoSubmit, payload);
        },
        *addModule({ payload }, { call, put }) {
            const response = yield call(addModule, payload);
            if (response.code === 1) {
                Message.success('新增模块成功,正在更新数据...');
                yield put({
                    type: 'getModuleList'
                });
            } else {
                Message.error('新增模块失败！');
            }
        }
    },
    reducers: {
        updateGlobalConfig(state, { payload }) {
            return { ...state, ...payload }
        },
        pushAdListItem(state, { payload }) {
            let data = payload.data;
            return { ...state, adlist: data }
        },
        updateModuleData(state, { payload }) {
            let data = payload.data;
            return { ...state, modulelist: data }
        }
    },
};
export default Model;
