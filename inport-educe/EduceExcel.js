import React from 'react';
import env from '../env';
import { Button } from 'antd';

class EduceExcel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiUrl: this.props.apiUrl ? this.props.apiUrl : '',
      name: this.props.name ? this.props.name : '导出',
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      apiUrl: nextProps.apiUrl
    })
  }



  onOutTo(apiurl){
    const data = this.props.data;
    const fileNameWithSuffix = 'export.xlsx';
    this.props.queryStrExport(apiurl, fileNameWithSuffix);
    this.props.onOutOk()
  }

  render() {

    return (
      <span>
        <Button onClick={() =>this.onOutTo(this.state.apiUrl)} size={this.props.size ? this.props.size : 'default'}>{this.state.name}</Button>
      </span>
    )
  }

}

export default EduceExcel;
