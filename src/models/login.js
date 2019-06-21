import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import router from 'umi/router';

import { login as postLogin } from '@/services/login';
import SERVICES from '../../config/serviceConfig';

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
        SERVICES.token = response.result;
        setAuthority('admin');//设置权限
        reloadAuthorized();//刷新权限
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
        setAuthority('guest');
        reloadAuthorized();
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isLogin: false
          },
        });
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
