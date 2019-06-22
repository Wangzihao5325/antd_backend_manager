import { queryCurrent, query as queryUsers } from '@/services/websiteOne';
import { fetchWebsiteOneGlobalConfig } from '@/services/websiteOne';
import { message as Message } from 'antd';

const Model = {
    namespace: 'websiteOne',
    state: {
        webSiteGlobalConfig: {}
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
        }
    },
    reducers: {
        updateGlobalConfig(state, { payload }) {
            return { ...state, ...payload }
        },
    },
};
export default Model;
