import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'antd';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

/**
 * 从 API 中获取编号 /api/pub/sn/serial?prefix=XXX
 * 
prefix 值：
  - IN   入库
  - OUT 出库
  - WH 仓库
  - SUP 供应商
  - P 商品
  - PUR 采购
  - CHK 盘点
 */
export default class SerialCode extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      API: '/api/pub/sn/serial',
      value: props.value,
    };
  }

  componentDidMount() {
    this.getData();
  }

  changeHandle = (v) => {
    this.setState({
      value: v
    });
    this.props.onChange(v);
  }
  getData = () => {
    const { API } = this.state;
    const { prefix } = this.props;
    if( prefix && this.props.isfirsttimeinit === 'true' && this.props.reset === true ){
      query(API,{ prefix }).then(({ code, data }) => {
        if( code === 200 ){
          this.setState({
            value: data
          });
          this.props.onChange(data);
        }
      });
      return false;
    }
    if(prefix && !this.props.value && this.props.isfirsttimeinit === 'true'){
      query(API,{ prefix }).then(({ code, data }) => {
        if( code === 200 ){
          this.setState({
            value: data
          });
          this.props.onChange(data);
        }
      });
    }
  }

  render() {
    const { value } = this.state;
    const { placeholder } = this.props;
	
    return (
      <Input
        defaultValue={ value }
        placeholder={ placeholder || '请输入' }
        onChange={this.changeHandle}
       />
    )
  }
}
