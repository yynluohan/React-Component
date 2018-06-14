import { query, create, get, remove, update, patch } from '../../../framework/service/index';
import { notification } from 'antd';

export default {
  namespace: 'showPieChart',

  state: {
    list: [],
    title: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {

    *index({ payload }, { call, put }) {
      const api = payload.api;
      delete payload.api;
      const result = yield call(get, `${api}`, { ...payload });
      if (result.code == 200) {
        result.data.data&&result.data.data.map((item,index) =>{
          if(item.name === 'DRAFT'){
            item.name = '草稿'
          }
          if(item.name === 'VERIFYING'){
            item.name = '审核中'
          }
          if(item.name === 'CHANGING'){
            item.name = '变更中'
          }
          if(item.name === 'CHANGE_FAIL'){
            item.name = '执行变更未通过'
          }
          if(item.name === 'APPROVE_FAIL'){
            item.name = '审批未通过'
          }
          if(item.name === 'VERIFIED'){
            item.name = '审核通过'
          }
          if(item.name === 'APPROVED'){
            item.name = '执行中'
          }
          if(item.name === 'ARCHIVING'){
            item.name = '未归档'
          }
          if(item.name === 'ARCHIVED'){
            item.name = '已归档'
          }
          if(item.name === 'CLOSED'){
            item.name = '已终止'
          }
          if(item.name === 'fail'){
            item.name = '不及格'
          }
          if(item.name === 'pass'){
            item.name = '及格'
          }
          if(item.name === 'good'){
            item.name = '良好'
          }
          if(item.name === 'perfect'){
            item.name = '优秀'
          }
        }
        )
        yield put({
          type: 'querySuccess',
          payload: {
             list: result.data.data,
             title: result.data.title
          }
        });
      };
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  }
};
