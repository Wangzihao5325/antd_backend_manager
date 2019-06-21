import { queryCurrent, query as queryUsers } from '@/services/websiteOne';
import { fetchWebsiteOneGlobalConfig } from '@/services/websiteOne';

const Model = {
    namespace: 'websiteOne',
    state: {
        webSiteGlobalConfig: {}
    },
    effects: {
        *getGlobalConfig({ payload }, { call, put }) {
            console.log('11111');
            // const response = yield call(fetchWebsiteOneGlobalConfig);
            // console.log(response);
        }
    },
    reducers: {
        changeWebSiteGlobalConfig(state, { payload }) {
            return { ...state, ...payload }
        },
    },
};
export default Model;
