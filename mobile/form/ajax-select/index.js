import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Select } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

class AjaxSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],
      API: '/api/wms/sku/units',
    }
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      this.getData();
    }
  }
  getData = () =>{
    if(this.state.list.length > 0){
      return
    }else{
	  const { API = this.state.API } = this.props;
      query(API).then(({ code, data }) => {   //查询api，获取数据
	    data = data.records || data;
        this.setState({
          list:data   //更新list
        })
      })
    }
  }

  handleChange = (value) => {
    const { options = {} } =this.props;
    if(value.length > 0){
      const max = options.maxTagCount || 1;
      value = value.slice(0,max);
      if(value.length <= 1){
        value = value.pop();
      }
    }
    this.props.onChange(value);
  }


  render() {

    const { list } = this.state;
	  const { options = {}, placeholder, width } =this.props;

    return (
       <Select mode="tags" maxTagCount={ options.maxTagCount || 1 } style={ {width: `${width}px`} } onChange={ this.handleChange } value={this.props.value} placeholder={ placeholder || '请选择' }>
          {
            list.length > 0 && list.map((item,index) => (
              <Select.Option key={index} value={ item[options.value] || item.unitName}>{ item[options.name] || item.unitName}</Select.Option>
            ))
          }
        </Select>
    )
  }
}

export default AjaxSelect;
