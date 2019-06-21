import { queryCurrent, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    name: 'user',
    type: 'admin',
  },
  reducers: {
    changeUserInfo(state, { payload }) {
      return { ...state, ...payload }
    },
  },
};
export default UserModel;
