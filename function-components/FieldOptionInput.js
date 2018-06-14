import React from 'react';
import { Select,Input } from 'antd';
import { query } from '../framework/service/index';

class FieldOptionInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],
      apiUrl: this.props.field ?  '/api/config/fields/' + this.props.field : '',
    }
  }

  onFocus = () =>{
    if(this.state.list.length > 0){
      return
    }else{
      query(this.state.apiUrl).then(({ code, data }) => {   //查询api，获取数据
        this.setState({
          list:data   //更新list
        })
      })
    }
  }


  render() {

    const { list } = this.state;

    return (
       <Select onChange={this.props.onChange} value={this.props.value} onFocus={this.onFocus} placeholder='请选择'>
          {
            list.length > 0 && list.map((item,index) => (
              <Select.Option key={index} value={item.value}>{item.value}</Select.Option>
            ))
          }
        </Select>
    )
  }
}

export default FieldOptionInput;
