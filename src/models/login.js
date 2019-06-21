import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import router from 'umi/router';

import { login as postLogin } from '@/services/login';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { name, password } = payload;
      const response = yield call(postLogin, payload);
      if (response.code === 1) {
        setAuthority('admin');
        reloadAuthorized();
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isLogin: true
          },
        });
        router.push('/');
      } else {
        message.error(response.message);
      }
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.isLogin };
    },
  },
};
export default Model;
