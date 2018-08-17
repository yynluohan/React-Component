import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Table from 'antd/lib/table';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';


// import { EventProxy, GMGeneralTable, GMTableAction } from 'kqd-general';

// let GeneralTableWrapped = GMTableAction(GMGeneralTable);

// import UploadImage from './UploadImage';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

import ImageBox from '../components/ImageBox';
import ProductSelect from '../components/productSelect';
import InputText from '../components/InputText';
import FormatCurrency from '../components/FormatCurrency';

// const { TextArea } = Input;

import './style.css';

export default class ProductRefunds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // reasons: undefined, // 退货原因文本域 内容
      API: '/rest/store/order', //获取订单详情
      orderCode: '',
      orderData: {}, // 获取到的 订单数据
      loading: false,
      modalVisible: false,
      editMoney: false,
      rowIndex: -1, // 当前操作行的 index
      refundsMoney: 0, // 当前退款金额
      refundsQuantity: 0, // 当前退款数量
      selectedRowKeys: [],
      imageList: [], // 上传的图片列， ['url','url']
      refundsDataSource: [], // 退货数据源
    };
  }

  orderColumns = [
    { title: '货品编号', dataIndex: 'barcode' },
    { title: '货品类型', dataIndex: 'type' },
    { title: '货品名称', dataIndex: 'product_name', width: 200, },
    { title: '图片', dataIndex: 'cover', render: (url) => <ImageBox value={ url } /> },
    { title: '购买数量/件', dataIndex: 'quantity' },
    { title: '单价', dataIndex: 'price', render: (value) => <FormatCurrency value={ value } /> },
    { title: '总价', dataIndex: 'final_price', render: (value) => <FormatCurrency value={ value } /> },
    { title: '操作', dataIndex: 'operational', render: (v,r,i) => {
      return <Fragment>
          <Button type="primary" onClick={ this.handleAddRefundItem.bind(null,i) }>退货</Button>
        </Fragment>;
    } },
  ];
  refundsColumns = [
    { title: '货品编号', dataIndex: 'barcode' },
    { title: '货品类型', dataIndex: 'type' },
    { title: '货品名称', dataIndex: 'name', width: 200, },
    { title: '图片', dataIndex: 'cover', render: (url) => <ImageBox value={ url } /> },
    { title: '退货数量/件', dataIndex: 'quantity' },
    { title: '支付金额', dataIndex: 'price', render: (value) => <FormatCurrency value={ value } /> },
    { title: '退货金额', dataIndex: 'refundAmount', render: (value) => <FormatCurrency value={ value } /> },
    { title: '操作', dataIndex: 'operational', render: (v,r,i) => {
      return <Fragment>
          <Button type="primary" onClick={ this.handleEditMoneyItem.bind(null,i) }>修改</Button>
          <Button type="danger" onClick={ this.handleRemoveItem.bind(null,i) }>移除</Button>
        </Fragment>;
    } },
  ];

  getData = () => {
    const { API, loading, orderCode } = this.state;
    if( !loading ){
      this.setState({
        loading: true,
      });
      query(`${API}/${orderCode}`).then(({ status_code, data }) => {
        if( status_code === 0 ){
          this.setState({
            orderData: data,
            loading: false,
          });
        }else{
          this.setState({
            loading: false,
            orderData: {},
          });
        }
      });
    }
  }

  handleAddRefundItem = (i) => {
    const { orderData } = this.state;
    let [ ...refundsDataSource ] = this.state.refundsDataSource;
    const item = orderData.order_items[i];
    item.name = item.product_name;
    refundsDataSource.push(item);

    this.handleSave(refundsDataSource);
  }
  handleMoadlVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  
  handleAddItem = (selectedItem) => {
    this.setState( prevState => ({
      refundsDataSource: [ ...prevState.refundsDataSource, ...selectedItem ],
      modalVisible: false,
    }), () => {
      this.props.onChange(this.state.refundsDataSource);
    });
  }
  handleEditMoneyItem = (i) => {
    this.setState({
      editMoney: true,
      rowIndex: i,
    });
  }
  setValue = (key,value) => {
    const temObj = {};
    temObj[key] = value;
    this.setState({
      ...temObj,
    })
  }

  handlEditMoneyClose = () => {
    this.setState({
      editMoney: false,
    });
  }
  handleEditConfirm = () => {
    const { rowIndex, refundsMoney, refundsQuantity } = this.state;
    let [ ...refundsDataSource ] = this.state.refundsDataSource;
    refundsDataSource[rowIndex].refundAmount = refundsMoney;
    refundsDataSource[rowIndex].quantity = refundsQuantity;
    
    this.handleSave(refundsDataSource);
    this.handlEditMoneyClose();
  }

  handleRemoveItem = (i) => {
    let [ ...refundsDataSource ] = this.state.refundsDataSource;
    refundsDataSource.splice(i,1);

    this.handleSave(refundsDataSource);
  }

  /**
   * 保存数据到 form
   */
  handleSave = (refundsDataSource) => {
    this.setState({
      refundsDataSource,
      refundsMoney: 0,
      refundsQuantity: 0,
      rowIndex: -1,
    }, () => {
      this.props.onChange( this.state.refundsDataSource );
    });
  }
  orderCounter = (key) => {
    const { orderData } = this.state;
    return orderData.order_items.reduce( (total, item) => {
      return total + (item[key] || 0);
    },0 );
  }
  refundsCounter = (key) => {
    const { refundsDataSource } = this.state;
    return refundsDataSource.reduce( (total, item) => {
      if( key === 'refundAmount' ){
        return total + (item[key] * item.quantity || 0);
      }
      return total + (item[key] || 0);
    },0 );
  }

  render() {
    const { modalVisible, refundsDataSource, loading, orderData } = this.state;
    const { editMoney, refundsMoney, refundsQuantity } = this.state;

    
    return (
      <Fragment>
        <Row type="flex" justify="start" align="middle">
          <Col span={10}>
            <InputText placeholder="请输入订单单号……"
              onChange={ this.setValue.bind(null,'orderCode') }
            />
            <Button type="primary" className="margin-1" loading={ loading } onClick={ this.getData }>搜索</Button>
          </Col>
          <Col span={2}></Col>
          <Col span={12} className="textAlignRight">
            { Object.keys(orderData).length > 0 ? '' : <Button type="primary" onClick={ this.handleMoadlVisible }>选择产品</Button> }
          </Col>
        </Row>

        { Object.keys(orderData).length > 0 ? (
          <Row type="flex" justify="start" align="middle">
            <Col span={6}>下单时间: { orderData.created_date }</Col>
            <Col span={4}>会员账号: -</Col>
            <Col span={4}>支付方式: { orderData.payment_type }</Col>
            <Col span={4}>结算人: { orderData.store_user_name }</Col>
          </Row>
        ) : ''}
        { Object.keys(orderData).length > 0 ? (
          <Row type="flex" justify="start" align="middle">
            <Col span={4}><span className={ `--ab-primary-color title` }>购买商品清单</span></Col>
            <Col span={4}>实付总额：<span className={ `--ab-primary-color title` }>￥ { orderData.total_price }</span></Col>
            <Col span={4}>购买总量：<span className={ `--ab-primary-color title` }>{ this.orderCounter('quantity') }</span></Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
          </Row>
        ) : ''}
        { Object.keys(orderData).length > 0 ? (
          <Table
            dataSource={ orderData.order_items }
            columns={ this.orderColumns }
            rowKey="id"
            pagination={ false }
          />
        ) : ''}

        <Row type="flex" justify="start" align="middle">
          <Col span={4}><span className={ `--ab-primary-color title` }>退款清单</span></Col>
          <Col span={4}>退款总额：<span className={ `--ab-primary-color title` }>￥ { this.refundsCounter('refundAmount') }</span></Col>
          <Col span={4}>退款总量：<span className={ `--ab-primary-color title` }>{ this.refundsCounter('quantity') }</span></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
        </Row>
        <Table
          dataSource={ refundsDataSource }
          columns={ this.refundsColumns }
          rowKey="id"
          pagination={ false }
        />

        <ProductSelect modalVisible={ modalVisible } onCancel={ this.handleMoadlVisible } onOk={ this.handleAddItem } />
        <Modal visible={ editMoney } closable={ false } width={ 300 } onCancel={ this.handlEditMoneyClose } onOk={ this.handleEditConfirm } destroyOnClose={ true }>
          <InputText type="number" label="退款数量：" placeholder="请输入退货数量……" value={ refundsQuantity } onChange={ this.setValue.bind(null,'refundsQuantity') } />
          <br />
          <InputText type="number" label="退款单价：" placeholder="请输入退款金额……" step={ 0.01 } value={ refundsMoney } onChange={ this.setValue.bind(null,'refundsMoney') } />
        </Modal>
      </Fragment>
    )
  }
}