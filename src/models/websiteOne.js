import { queryCurrent, query as queryUsers } from '@/services/websiteOne';
import { fetchWebsiteOneGlobalConfig } from '@/services/websiteOne';

const Model = {
    namespace: 'websiteOne',
    state: {
        webSiteGlobalConfig: {}
    },
    effects: {
        *getGlobalConfig(_, { call, put }) {
            const response = yield call(fetchWebsiteOneGlobalConfig);
            console.log(response);
            // yield put({
            //     type: 'updateGlobalConfig',
            //     payload: {
            //       isLogin: true
            //     },
            // });
        }
    },
    reducers: {
        updateGlobalConfig(state, { payload }) {
            return { ...state, ...payload }
        },
    },
};
export default Model;
