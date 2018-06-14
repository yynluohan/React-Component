import { query, create, get, remove, update, patch } from '../../../framework/service/index';
import { notification } from 'antd';

export default {
  namespace: 'showBarChart',

  state: {
    list: [],
    title: '',
    monthData: [],
    lastMonthData: [],
    xAxis: []
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
      if (result.code === 200 && result.data) {
        const xAxisData = result.data.xAxis;
        for(var i = 0; i < xAxisData.length; i++){
          if(xAxisData[i] == 'fail'){
            xAxisData[i] = '不及格'
          }
          if(xAxisData[i] == 'pass'){
            xAxisData[i] = '及格'
          }
          if(xAxisData[i] == 'good'){
            xAxisData[i] = '良好'
          }
          if(xAxisData[i] == 'perfect'){
            xAxisData[i] = '优秀'
          }
          if(xAxisData[i] === 'DRAFT'){
            xAxisData[i] = '草稿'
          }
          if(xAxisData[i] === 'VERIFYING'){
            xAxisData[i] = '审核中'
          }
          if(xAxisData[i] === 'CHANGING'){
            xAxisData[i] = '变更中'
          }
          if(xAxisData[i] === 'CHANGE_FAIL'){
            xAxisData[i] = '执行变更未通过'
          }
          if(xAxisData[i] === 'APPROVE_FAIL'){
            xAxisData[i] = '审批未通过'
          }
          if(xAxisData[i] === 'VERIFIED'){
            xAxisData[i] = '审核通过'
          }
          if(xAxisData[i] === 'APPROVED'){
            xAxisData[i] = '执行中'
          }
          if(xAxisData[i] === 'ARCHIVING'){
            xAxisData[i] = '未归档'
          }
          if(xAxisData[i] === 'ARCHIVED'){
            xAxisData[i] = '已归档'
          }
          if(xAxisData[i] === 'CLOSED'){
            xAxisData[i] = '已终止'
          }
        }
        yield put({
          type: 'querySuccess',
          payload: {
            monthData: result.data.data,
            lastMonthData: result.data.lastData,
            xAxis: xAxisData,
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
