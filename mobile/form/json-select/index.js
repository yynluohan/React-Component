import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Select } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

class JSONSelect extends React.Component {

  constructor(props) {
    super(props);
    this.valueObj = JSON.parse(props.value || '{}');
    this.state = {
      list: props.options || [],
      API: props.API || '',
      value: this.valueObj[props.mainField],
    }
  }

  onFocus = () =>{
    if(this.state.list.length > 0){
      return
    }else{
	  const { API = this.state.apiUrl } = this.props;
      query(API).then(({ code, data }) => {   //查询api，获取数据
	    data = data.records || data;
        this.setState({
          list:data   //更新list
        })
      })
    }
  }
  handleChange = (value) => {
    this.setState({ value });
    let temObj = {};
    temObj[this.props.mainField] = value;
    this.props.onChange({
      ...this.valueObj,
      ...temObj,
    });
    // fetch(value, data => this.setState({ data }));
  }


  render() {
    const { list, value } = this.state;
    const { placeholder, width } =this.props;
    const optionsItem = list.map(d => <Option key={d.value}>{d.name}</Option>);

    return (
      <Select
        style={ {width: `${width}px`} }
        mode="combobox"
        value={ value }
        placeholder={ placeholder }
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={ this.handleChange }
      >
        {optionsItem}
    </Select>
    )
  }
}

export default JSONSelect;
