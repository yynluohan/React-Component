import React, { Fragment, Component } from 'react';
import replaceKey from './utils/replaceKey';
/**
 * 格式化输入的 data
 * 
 * 接收参数
 * - data 待格式化的数据源
 * - map 格式化的 map。data[map.key] =>> data[map.value]
 * 
 * 返回一个格式化后的 新对象/新数组
 */
export default (WrappedComponent, map) => {
  class Gateway extends Component {
    constructor (props) {
      super(props)
      this.state = {
        data: props.data || null,
      }
      this.replaceKey = replaceKey(map);
    }

    format = () => {
      const rst = this.state.data;
      return this.replaceKey(rst);
    }

    render () {
      return <WrappedComponent data={ this.format() } />
    }
  }
  return Gateway
}