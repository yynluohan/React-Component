import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

class FieldConfigSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],
      apiUrl: this.props.id ?  '/api/config/fields/' + this.props.id : '',
    }
  }

  static contextTypes = {
    queryData: PropTypes.object,
    dispatch: PropTypes.any,
    namespace: PropTypes.string,
    dataPool: PropTypes.object,
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      this.onFocus();
    }
  }
  
  handleChange = (value) => {
    value = String(value);
    const { options = {} } =this.props;
    const { dispatch, namespace } = this.context;
    if(options.queryData){
      const { queryData, dataPool } = this.context;
      dataPool.addToTemp({
        disableItemsSelect: true,
      });
      Object.keys(options.queryData).forEach( key => {
        queryData[key] = value;
      });
      dispatch({
        type: `${namespace}/resetCurrentItem`,
      });
    }

    if(options.API){
      const { API, itemsField } = options;
      dispatch({
        type: `${namespace}/fetchOneItems`,
        payload: {
          id: value,
          API,
          itemsField,
        }
      });
    }
    
    this.props.onChange(value);
  }
  onFocus = () =>{
    if(this.state.list.length > 0){
      return
    }else{
	  const { API = this.state.apiUrl } = this.props;
      query(API).then(({ code, data }) => {   //查询api，获取数据
	    data = data.records || data.list || data;
        this.setState({
          list:data   //更新list
        })
      })
    }
  }


  render() {

    const { list } = this.state;
	  const { options = {}, placeholder, width } =this.props;

    return (
       <Select style={ {width: `${width}px`} } onChange={ this.handleChange } value={ this.props.value ? String(this.props.value) : undefined } onFocus={this.onFocus} placeholder={ placeholder || '请选择' }>
          {
            list.length > 0 && list.map((item,index) => (
              <Select.Option key={index} value={ item[options.value] || item.value}>{ item[options.name] || item.value}</Select.Option>
            ))
          }
        </Select>
    )
  }
}

export default FieldConfigSelect;
