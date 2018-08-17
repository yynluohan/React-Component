import React, { Component, Fragment } from 'react';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

import ImageBox from '../ImageBox';
const Search = Input.Search;

const Status = ({value}) => {
  const statusMap = {
    'ONSELL': <span style={{color: '#52c41a'}}>在售</span>,
  }
  return statusMap[value] ? statusMap[value] : value;
}

/**
 * 在弹出的模态框里面选择产品。
 * 
 * - modalVisible <Boolean> 控制模态框的 显示/隐藏
 * - onCancel <Function> 关闭模态框的回调
 * - onOk <Function> 确认模态框的回调
 */
export default class ProductSelect extends Component{
  constructor(props){
    super(props);
    this.state = {
      API: '/rest/product?all=true',
      productDataSource: [],
      selectedRowKeys: [],
    };
    this.selectProductColumns = [
      { title: '货品编号', dataIndex: 'code' },
      { title: '货品类型', dataIndex: 'type' },
      { title: '货品名称', dataIndex: 'name' },
      { title: '图片', dataIndex: 'cover', render: (url) => <ImageBox value={ url } /> },
      { title: '库存数量', dataIndex: 'quantity' },
      // { title: '价格', dataIndex: 'price' },
      { title: '状态', dataIndex: 'status', width: 64, render: (v) => <Status value={ v } /> },
    ];
  }

  componentDidMount() {
    this.getData();
  }
  getData = (queryData) => {
    const { API } = this.state;
    query(API,queryData).then(({ status_code, data }) => {
      if( status_code === 0 ){
        this.setState({
          productDataSource: data
        });
      }
    });
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  handleSearch = (v) => {
    this.getData({
      serach: v,
    });
  }
  handleOk = () => {
    const { selectedRowKeys, productDataSource } = this.state;
    console.log('handleOk',selectedRowKeys);
    const selectedItem = selectedRowKeys.map( index => {
      return productDataSource[index - 1];
    })
    if( this.props.onOk ){
      this.props.onOk(selectedItem);
    }
  }

  render(){
    const { productDataSource, selectedRowKeys } = this.state;
    const { modalVisible, onCancel } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return(
      <Modal visible={ modalVisible } width={ 700 } onCancel={ onCancel } onOk={ this.handleOk }>
        <Search
          placeholder="编号、名称"
          onSearch={ this.handleSearch }
          enterButton
          style={{width: '250px'}}
        />
        <br /><br />
        <Table
          dataSource={ productDataSource }
          columns={ this.selectProductColumns }
          rowSelection={ rowSelection }
          rowKey="id"
          bordered={ true }
        />
      </Modal>
    );
  }
}