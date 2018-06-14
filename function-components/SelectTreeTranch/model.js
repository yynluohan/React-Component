import { query } from '../../../framework/service/index';

export default {
  namespace: 'selectTreeTranch',

  state: {
    teamList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *index({ payload }, { call, put, select }) {
      const api = payload.api;
      delete payload.api;
      const result = yield call(query, `${api}`,{...payload});
      yield put({
        type: 'querySuccess',
        payload: {
          teamList: result.data
        }
      })
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  }
};
