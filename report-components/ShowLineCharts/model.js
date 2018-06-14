import { query, create, get, remove, update, patch } from '../../../framework/service/index';
import { notification } from 'antd';

export default {
  namespace: 'showCharts',

  state: {
    name: '',
    value: '',
    title: '',
  },


  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {

    *index({ payload }, { call, put }) {
      console.log('222111');
      const api = payload.api;
      console.log('this api = ',api);
      delete payload.api;
      const result = yield call(get, `${api}`, { ...payload });
      if(result.code == 200){
        console.log('this.data = ',result);


        if (result.code === 200 && result.data) {
          const nameData = result.data.dataAxis;
          const valueData = result.data.data;
          const titleData = result.data.title;
          var x = [];
          var y = [];

          for(var i = 0; i < nameData.length; i++){
            x = nameData[i].split("-");
            console.log('xxxx = ',x);
            y.push(x[1]);
          }
            console.log('xxxxxxxxxxxxx');

          yield put({
            type: 'querySuccess',
            payload: {
              name: y,
              value: valueData,
              title: titleData,
            }
          });
        };
      } else{
        notification['error']({ message: '暂无相关数据' });
      }
    },

  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  }
};
